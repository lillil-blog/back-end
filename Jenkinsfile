pipeline {
    agent any

    options {
        timeout(time: 2, unit: 'MINUTES')
    }

    stages {
        stage('clone') {
            steps {
                echo "Cloning Git Repository..."

                dir('/apps/dstb/server') {
                    sh 'npx pm2 stop all'

                    checkout scm
                }
            }
        }

        stage('build') {
            steps {
                echo "Building Project..."

                dir('/apps/dstb/server') {
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
// 2
// 3