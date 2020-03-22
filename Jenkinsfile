pipeline {
    agent any
    enviroment {
        CI = 'true',
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