pipeline {
    agent any
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'chmod +x ./scripts/up.sh'
                sh 'chmod +x ./scripts/down.sh'
            }
        }
        stage('Delivery') {
            steps {
                sh 'docker-compose up'
            }
        }
    }
}