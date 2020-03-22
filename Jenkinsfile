pipeline {
    agent any
    environment {
        PATH = './'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'

            }
        }
        stage('Delivery') {
            steps {
                sh 'npm start'
            }
        }
    }
}