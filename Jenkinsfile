pipeline {
    agent {
        docker {
            image 'node:dubnium-alpine',
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
                sh 'cd apps && npm install'
            }
        }
        stage('Delivery') {
            steps {
                sh 'npm run build'
                sh 'start:prod'
            }
        }
    }
}