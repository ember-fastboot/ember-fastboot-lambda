# Ember FastBoot Lambda

[![Greenkeeper badge](https://badges.greenkeeper.io/ember-fastboot/ember-fastboot-lambda.svg)](https://greenkeeper.io/)

This addon automates deploying your Ember application to [AWS
Lambda][aws-lambda]. Lambda is Amazon's platform for running JavaScript
code without provisioning or managing servers.

Once deployed, your app will use FastBoot to render HTML on the server,
as well as serving the JavaScript, CSS and other assets.

[aws-lambda]: https://aws.amazon.com/lambda/

### Required Steps

1. Automate provisioning AWS
2. Build browser build (default to production environment)
3. Build FastBoot build (default to production environment)
4. Upload browser assets to S3/CloudFront
5. Create FastBoot package
  1. Create npm package
  2. Install ember-fastboot-server
  3. Build contextify/other native dependencies for Lambda
     (thaumaturgy?)
  4. Configure build w/ correct asset URLs

### Open Questions

Best practices for storing AWS credentials?
Handling environments/targets?

## Installation

* `ember install ember-fastboot-lambda`

## Provisioning AWS

Provision AWS to run an Ember app via FastBoot by running:

```sh
ember lambda:provision
```

You will be prompted for more information.
