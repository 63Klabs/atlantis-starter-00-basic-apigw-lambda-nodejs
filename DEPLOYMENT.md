# Deployment Guide

This application is **Ready-to-Deploy-and-Run** with the [63Klabs Atlantis Templates and Scripts Platform for Serverless Deployments on AWS](https://github.com/63Klabs/atlantis)

- Use the Atlantis scripts to manage your application's repository and deployment.
- Add a pipeline to each branch in your repository you want to deploy from (test, beta, main)
- Make all code changes in the `dev` branch.
- To initiate a deployment, just merge your code from the `dev` branch to the `test` branch and push. This will kick-off the test deployment pipeline.
- You can subsequently deploy your code to the next instance (beta and main/prod) by merging and pushing.

Follow your organization's guidelines for repository and pipeline management.
