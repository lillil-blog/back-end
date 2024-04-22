def DEPLOY_URL = "/apps/dstb/server"

def GIT_TARGET_REPOSITORY = "https://github.com/lillil-blog/back-end.git"
def GIT_TARGET_BRANCH = "dev"

def SSH_KEY = "~/.ssh/jenkins_rsa"
def SSH_TARGET_SERVER = "root@172.17.0.4"

pipeline {
    agent any

    options {
        timeout(time: 3, unit: "MINUTES")
    }

    stages {
        stage("clone") {
            steps {
                echo "Cloning Git Repository..."
                dir("${DEPLOY_URL}") {
                    git branch: "${GIT_TARGET_BRANCH}", url: "${GIT_TARGET_REPOSITORY}"
                }
            }
        }

        stage("build") {
            steps {
                echo "Building Project..."
                sh "ssh -i ${SSH_KEY} ${SSH_TARGET_SERVER} 'cd /app/ && npm install --force && npm run build'"
            }
        }

        stage("restart") {
            steps {
                echo "Restarting PM2 Process..."
                sh "ssh -i ${SSH_KEY} ${SSH_TARGET_SERVER} 'cd /app/ && npx pm2 list && npx pm2 reload all && npx pm2 list'"
            }
        }
    }
}