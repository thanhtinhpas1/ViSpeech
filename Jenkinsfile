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
                sh 'docker-compose up'
            }
        }
    }
}