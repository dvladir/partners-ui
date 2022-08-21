pipeline {

  options {
    disableConcurrentBuilds()
  }

  agent any

  environment {
      BRANCH="${BRANCH_NAME.replaceAll('feat/', '').toLowerCase()}"
  }

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
        stage("FEATURE DEV ENV") {
          when {branch 'feat/*'}
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
        echo "BRANCH: '${BRANCH}'"
        echo "INSTALL: '${INSTALL_CONFIG}'"
      }
    }
    stage('Build') {
      agent {
        docker {
          image "docker.dvladir.work/rastasheep/alpine-node-chromium:14-alpine"
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
      steps {
        sh 'docker build --tag docker-push.dvladir.work/partners/$BRANCH/partners-ui:latest --file Dockerfile.deploy .'
        sh 'docker push docker-push.dvladir.work/partners/$BRANCH/partners-ui:latest'
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }

}
