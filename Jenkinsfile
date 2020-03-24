pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile.build'
            args '-v /var/run/docker.sock:/var/run/docker.sock -v /etc/timezone:/etc/timezone -v $HOME/.cache:/root/.cache -v $HOME/.ivy2:/root/.ivy2 -v $HOME/.npm:/root/.npm'
        }
    }   
    environment {
        CI = 'true'
    }
    stages {
        stage('clean') {
            when {
                isRestartedRun()
            }
            steps {
                sh 'rm -rf dist node_module apps/node_module apps/build'
                sh 'docker system prune -af --volumes'
            }
        }
        stage('install') {
            steps {
                sh 'npm install'
                dir('apps') {
                    sh 'npm install'
                }
            }
        }
        stage('compile') {
            steps {
                sh 'npm run build'
                dir ('apps') {
                    sh 'npm run build'
                }
            }
        }
        stage('docker') {
            steps {
                sh 'docker build -t vispeech .'
            }
        }
        stage('delivery') {
            steps {
                sh 'docker rm -f vispeech || true'
                sh 'docker run --name=vispeech -d --restart=always -p 7070:7070 vispeech'
            }
        }
    }
}