pipeline {
    agent any

    environment {
        DEPLOY_PATH = '/apps/dstb/server'
    }

    options {
        timeout(time: 2, unit: 'MINUTES')
    }

    stages {
        stage('clone') {
            steps {
                echo "Cloning Git Repository..."

                dir('${env.DEPLOY_PATH}') {
                    sh 'npx pm2 stop all'

                    checkout scm
                }
            }
        }

        stage('build') {
            steps {
                echo "Building Project..."

                dir('${env.DEPLOY_PATH}') {
                    sh '''
                    npm install --force
                    npm run build

                    npx pm2 start all
                    '''
                }
            }
        }
    }
}
// 젠킨스 테스트
// 1