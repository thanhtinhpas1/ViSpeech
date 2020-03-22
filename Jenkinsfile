pipeline {
    agent any
    environment {
        PATH = './'
        GIT_HOST = 'https://github.com/thanhtinhpas1/ViSpeech'
        BRANCH_HOST = 'dev-master'
    }
    stages {
        stage('Delivery') {
            steps {
                sh 'chmod +x ./scripts/up.sh && ./scripts/up.sh'
            }
        }
    }
}