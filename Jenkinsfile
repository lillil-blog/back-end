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
                sh 'pwd'
                checkout scm
            }
        }

        stage('build') {
            steps {
                echo "Building Project..."
                nodejs('NodeJS 20.10.0') {
                    sh '''
                        pwd
                        npm install --force
                        npm run build
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying to shared volume..."
                sh '''
                    pwd
                    cp -rf ./ /apps/jenkins_build
                '''
            }
        }
    }
}