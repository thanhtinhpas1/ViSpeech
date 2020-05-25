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
                sh 'rm -rf ui/node_module ui/build'
                sh 'docker system prune -af --volumes'
            }
        }
        stage('install') {
            steps {
                sh 'npm install --production'
                dir('ui') {
                    sh 'npm install --production'
                }
            }
        }
        stage('compile') {
            steps {
                dir('ui') {
                    sh 'npm run build'
                }
            }
        }
        stage('docker') {
            steps {
                sh 'docker build -t vispeechui .'
            }
        }
        stage('delivery') {
            steps {
                sh 'docker rm -f vispeechui || true'
                sh 'docker run --name=vispeechui -d --restart=always -p 3200:3200 vispeechui'
            }
        }
    }
}