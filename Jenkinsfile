pipeline {

  options {
    disableConcurrentBuilds()
  }

  agent any

  stages {
    stage('Build') {
      agent {
        docker {
          image "rastasheep/alpine-node-chromium:14-alpine"
          args '--net=host'
          reuseNode true
        }
      }
      steps {
        sh 'yarn'
        sh 'yarn build'
      }
    }
    stage('Deploy') {
      environment {
        DEPLOY_HOST = credentials('deploy-host')
        DEPLOY_PORT = credentials('deploy-port')
      }
      steps {
        sh 'DOCKER_BUILDKIT=1 docker build --output type=tar,dest=partners-ui.tar --file Dockerfile.deploy .'
        sh 'gzip partners-ui.tar'
        withCredentials([ssUserPrivateKey(
          credentialsId: 'deploy',
          keyFileVariable: 'keyfile',
          passprhaseVariable: 'passphrase',
          usernameVariable: 'userName'
        )]) {
          sh 'echo ${passphrase} >> pass'
          sh 'sshpass -Ppassphrase -f ./pass scp -i ${keyfile} -P ${DEPLOY_PORT} ./partners-ui.tar.gz ${userName}@${DEPLOY_HOST}:~/partners-deploy/partners-ui.tar.gz'
          sh 'sshpass -Ppassphrase -f ./pass ssh -i ${keyfile} -p ${DEPLOY_PORT} ${userName}@${DEPLOY_HOST} cd \\~/partners-deploy \\&\\& ./scripts/recreate.sh ./partners-ui.tar.gz dvladir:partners-ui front'
        }
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }

}
