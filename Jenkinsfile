pipeline {

  options {
    disableConcurrentBuilds()
  }

  agent any

  stages {
    stage("Prepare env") {
      parallel {
        stage("DEV ENV") {
          when {branch 'develop'}
          steps {
            script {
              env.INSTALL_CONFIG = 'dev-npm-rc'
            }
          }
        }
        stage("MASTER ENV") {
          when {branch 'master'}
          steps {
            script {
              env.INSTALL_CONFIG = 'master-npm-rc'
            }
          }
        }
      }
    }
    stage("Show env") {
      steps {
        echo "INSTALL: '${INSTALL_CONFIG}'"
      }
    }
    stage('Build') {
      agent {
        docker {
          image "rastasheep/alpine-node-chromium:14-alpine"
          args '--net=host'
          reuseNode true
        }
      }
      steps {
        withNPM(npmrcConfig: "${env.INSTALL_CONFIG}") {
          sh 'yarn'
          sh 'yarn build'
        }
      }
    }
    stage('Deploy') {
      environment {
        DEPLOY_HOST = credentials('deploy-host')
        DEPLOY_PASS = credentials('deploy-pass')
      }
      steps {
        sh 'DOCKER_BUILDKIT=1 docker build --output type=tar,dest=partners-ui.tar --file Dockerfile.deploy .'
        sh 'gzip partners-ui.tar'
        sh 'echo ${DEPLOY_PASS} >> pass'
        sh 'sshpass -Ppassphrase -f ./pass rsync ./partners-ui.tar.gz ${DEPLOY_HOST}:~/partners-deploy/partners-ui.tar.gz'
        sh 'sshpass -Ppassphrase -f ./pass ssh ${DEPLOY_HOST} cd \\~/partners-deploy \\&\\& ./scripts/recreate.sh ./partners-ui.tar.gz dvladir:partners-ui front'
        sh 'rm ./pass'
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }

}
