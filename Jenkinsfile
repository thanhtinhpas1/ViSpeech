pipeline {
    agent {
        docker {
            image 'node:dubnium-alpine'
            args '-p 7070:7070'
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
                sh 'npm run start:prod'
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