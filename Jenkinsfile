pipeline {
    agent any
    enviroment {
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