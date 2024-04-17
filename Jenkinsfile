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
                dir('apps/jenkins_build') {
                    sh 'rm -rf *'
                    nodejs('NodeJS 20.10.0') {
                        sh '''
                            npm install --force
                            npm run build
                        '''
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying to shared volume..."
                dir('apps/jenkins_build') {
                    sh '''
                        pwd
                        cp -r /apps/jenkins_build/dist /apps/dstb/server/dist
                    '''
                }
            }
        }
    }
}