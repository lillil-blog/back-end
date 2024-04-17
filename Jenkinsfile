pipeline {
    agent any

    options {
        timeout(time: 2, unit: 'MINUTES')
    }

    stages {
        stage('clone') {
            steps {
                echo "Cloning Git Repository..."
                nodejs('NodeJS 20.10.0') {
                    dir('/apps/dstb/server') {
                        sh 'npx pm2 stop all'
                        checkout scm
                    }
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
                        
                        npx pm2 start all
                        '''
                    }
                }
            }
        }
    }
}