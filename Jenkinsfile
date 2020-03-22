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
            }
        }
        stage('Delivery') {
            steps {
                sh 'npm run build'
                sh 'npm run start:prod'
            }
        }
    }
}