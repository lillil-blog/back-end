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
                    checkout scm
                }
                script {
                    sh 'docker exec dstb_test_back npx pm2 list'
                }
            }
        }

        stage('build') {
            steps {
                echo "Building Project..."
                nodejs('NodeJS 20.10.0') {
                    dir('/apps/dstb/server') {
                        sh '''
                        npm install --force
                        npm run build
                        '''
                    }
                }
            }
        }
    }
}