pipeline {
    // 테스트중
    agent any

    options {
        timeout(time: 2, unit: 'MINUTES')
    }

    stages {
        stage('clone') {
            steps {
                echo "Cloning Git Repository..."
                checkout scm
            }
        }

        stage('build') {
            steps {
                echo "Building Project..."
                nodejs('NodeJS 20.10.0') {
                    sh '''
                        npm install --force
                        npm run build
                    '''
                }
            }
        }

        stage('deploy') {
            steps {
                echo "Deploying to shared volume..."
                sh '''
                    cp ./dist /apps/jenkins_build
                '''
            }
        }
    }
}