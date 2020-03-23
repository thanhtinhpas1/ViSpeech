pipeline {
    agent {
        docker {
            image 'node:dubnium-alpine'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t vispeech .'
            }
        }
        stage('Delivery') {
            steps {
                sh 'docker rm -f vispeech'
                sh 'docker run --name=vispeech -d --restart=always -p 7070:7070 vispeech'
            }
        }
    }
}