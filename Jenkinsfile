pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile.build'
            reuseNode true
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm install ./apps'
                sh 'npm run build'
                sh 'npm run build ./apps'
            }
        }
        stage('Clean') {
            steps {
                sh 'docker rm -f vispeech'
            }
        }
        stage('Delivery') {
            steps {
                sh 'docker build -t vispeech'
                sh 'docker run --name vispeech --restart=always -p 7070:7070 vispeech'
            }
        }
    }
}