pipeline {
    agent any
    environment {
        PATH = './'
    }
    stages {
        stage('Deploy') {
            steps {
                sh 'chmod +x ./scripts/up.sh && ./scripts/up.sh'
            }
        }
    }
}