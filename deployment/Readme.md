This folder has the deployment setup of How To Hypermedia.

While these commands are one-off, publishing will be ongoing and is independent to terraform but is included for completeness. Publishing does not use the `todo-admin` user.

### Prerequisites

* [Terraform](https://www.terraform.io/) and add it to your PATH so you can execute it from anywhere.
* [AWS CLI](https://aws.amazon.com/cli/) and configured to interact with your AWS account.
    * `.aws/config` requires credentials for 'todo-admin' user
* AWS user (`todo-admin`) with credentials to create
   * Create CloudFront Distribution
   * Create ACM Certificate
* a certificate already manually created (in N. Virginia)

> Note: certificate creation: `aws acm request-certificate --domain-name howtohypermedia.semanticlink.io --validation-method DNS --region us-east-1` and that returns the arn

## Setup

Initialize the Terraform template from within the `deployment` directory.

```bash
cd deployment
terraform init

Initializing provider plugins...
Checking for available provider plugins on https://releases.hashicorp.com...
Downloading plugin for provider "aws" (1.42.0)...
```


With the providers initialized, you can run terraform plan in order to get a visualization of what resources are going to be created. The necessary variables from `variables.tf` are picked up automatically.

```bash
terraform plan


Refreshing Terraform state in-memory prior to plan...
The refreshed state will be used to calculate this plan, but will not be
persisted to local or remote state storage.


------------------------------------------------------------------------

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  + aws_cloudfront_distribution.site_distribution
      id:                                                                                                   <computed>
      active_trusted_signers.%:                                                                             <computed>
      aliases.#:                                                                                            "1"
      aliases.297710837:                                                                                    "howtohypermedia.semanticlink.io"
      arn:                                                                                                  <computed>
      caller_reference:                                                                                     <computed>
      default_cache_behavior.#:                                                                             "1"
      default_cache_behavior.1313465292.allowed_methods.#:                                                  "2"
      default_cache_behavior.1313465292.allowed_methods.0:                                                  "GET"
      default_cache_behavior.1313465292.allowed_methods.1:                                                  "HEAD"
      default_cache_behavior.1313465292.cached_methods.#:                                                   "2"
      default_cache_behavior.1313465292.cached_methods.0:                                                   "GET"
      default_cache_behavior.1313465292.cached_methods.1:                                                   "HEAD"
      default_cache_behavior.1313465292.compress:                                                           "true"
      default_cache_behavior.1313465292.default_ttl:                                                        "86400"
      default_cache_behavior.1313465292.field_level_encryption_id:                                          ""
      default_cache_behavior.1313465292.forwarded_values.#:                                                 "1"
      default_cache_behavior.1313465292.forwarded_values.2759845635.cookies.#:                              "1"
      default_cache_behavior.1313465292.forwarded_values.2759845635.cookies.2625240281.forward:             "none"
      default_cache_behavior.1313465292.forwarded_values.2759845635.cookies.2625240281.whitelisted_names.#: "0"
      default_cache_behavior.1313465292.forwarded_values.2759845635.headers.#:                              "0"
      default_cache_behavior.1313465292.forwarded_values.2759845635.query_string:                           "false"
      default_cache_behavior.1313465292.forwarded_values.2759845635.query_string_cache_keys.#:              "0"
      default_cache_behavior.1313465292.lambda_function_association.#:                                      "0"
      default_cache_behavior.1313465292.max_ttl:                                                            "31536000"
      default_cache_behavior.1313465292.min_ttl:                                                            "0"
      default_cache_behavior.1313465292.smooth_streaming:                                                   ""
      default_cache_behavior.1313465292.target_origin_id:                                                   "howtohypermedia.semanticlink.io"
      default_cache_behavior.1313465292.trusted_signers.#:                                                  "0"
      default_cache_behavior.1313465292.viewer_protocol_policy:                                             "redirect-to-https"
      default_root_object:                                                                                  "index.html"
      domain_name:                                                                                          <computed>
      enabled:                                                                                              "true"
      etag:                                                                                                 <computed>
      hosted_zone_id:                                                                                       <computed>
      http_version:                                                                                         "http2"
      in_progress_validation_batches:                                                                       <computed>
      is_ipv6_enabled:                                                                                      "false"
      last_modified_time:                                                                                   <computed>
      origin.#:                                                                                             "1"
      origin.~2016766511.custom_header.#:                                                                   "0"
      origin.~2016766511.custom_origin_config.#:                                                            "1"
      origin.~2016766511.custom_origin_config.1702400468.http_port:                                         "80"
      origin.~2016766511.custom_origin_config.1702400468.https_port:                                        "443"
      origin.~2016766511.custom_origin_config.1702400468.origin_keepalive_timeout:                          "5"
      origin.~2016766511.custom_origin_config.1702400468.origin_protocol_policy:                            "http-only"
      origin.~2016766511.custom_origin_config.1702400468.origin_read_timeout:                               "30"
      origin.~2016766511.custom_origin_config.1702400468.origin_ssl_protocols.#:                            "3"
      origin.~2016766511.custom_origin_config.1702400468.origin_ssl_protocols.0:                            "TLSv1"
      origin.~2016766511.custom_origin_config.1702400468.origin_ssl_protocols.1:                            "TLSv1.1"
      origin.~2016766511.custom_origin_config.1702400468.origin_ssl_protocols.2:                            "TLSv1.2"
      origin.~2016766511.domain_name:                                                                       "${aws_s3_bucket.blog.website_endpoint}"
      origin.~2016766511.origin_id:                                                                         "howtohypermedia.semanticlink.io"
      origin.~2016766511.origin_path:                                                                       ""
      origin.~2016766511.s3_origin_config.#:                                                                "0"
      price_class:                                                                                          "PriceClass_All"
      restrictions.#:                                                                                       "1"
      restrictions.1097372288.geo_restriction.#:                                                            "1"
      restrictions.1097372288.geo_restriction.2625240281.locations.#:                                       "0"
      restrictions.1097372288.geo_restriction.2625240281.restriction_type:                                  "none"
      retain_on_delete:                                                                                     "false"
      status:                                                                                               <computed>
      viewer_certificate.#:                                                                                 "1"
      viewer_certificate.186202422.acm_certificate_arn:                                                     "arn:aws:acm:us-east-1:031040973224:certificate/5aad8769-7f1a-4911-996f-76fa6f0473c2"
      viewer_certificate.186202422.cloudfront_default_certificate:                                          ""
      viewer_certificate.186202422.iam_certificate_id:                                                      ""
      viewer_certificate.186202422.minimum_protocol_version:                                                "TLSv1"
      viewer_certificate.186202422.ssl_support_method:                                                      "sni-only"

  + aws_s3_bucket.blog
      id:                                                                                                   <computed>
      acceleration_status:                                                                                  <computed>
      acl:                                                                                                  "private"
      arn:                                                                                                  <computed>
      bucket:                                                                                               "howtohypermedia.semanticlink.io"
      bucket_domain_name:                                                                                   <computed>
      bucket_regional_domain_name:                                                                          <computed>
      force_destroy:                                                                                        "false"
      hosted_zone_id:                                                                                       <computed>
      policy:                                                                                               "{\n  \"Version\":\"2012-10-17\",\n  \"Statement\":[\n    {\n      \"Sid\":\"AddPerm\",\n      \"Effect\":\"Allow\",\n      \"Principal\": \"*\",\n      \"Action\":[\"s3:GetObject\"],\n      \"Resource\":[\"arn:aws:s3:::howtohypermedia.semanticlink.io/*\"]\n    }\n  ]\n}\n"
      region:                                                                                               <computed>
      request_payer:                                                                                        <computed>
      versioning.#:                                                                                         <computed>
      website.#:                                                                                            "1"
      website.0.error_document:                                                                             "404.html"
      website.0.index_document:                                                                             "index.html"
      website_domain:                                                                                       <computed>
      website_endpoint:                                                                                     <computed>


Plan: 2 to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------

Note: You didn't specify an "-out" parameter to save this plan, so Terraform
can't guarantee that exactly these actions will be performed if
"terraform apply" is subsequently run.

```

## Create

```bash
terraform apply

aws_s3_bucket.blog: Refreshing state... (ID: howtohypermedia.semanticlink.io)

An execution plan has been generated and is shown below.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  + aws_cloudfront_distribution.site_distribution
      id:                                                                                                   <computed>
      active_trusted_signers.%:                                                                             <computed>
      aliases.#:                                                                                            "1"
      aliases.297710837:                                                                                    "howtohypermedia.semanticlink.io"
      arn:                                                                                                  <computed>
      caller_reference:                                                                                     <computed>
      default_cache_behavior.#:                                                                             "1"
      default_cache_behavior.1313465292.allowed_methods.#:                                                  "2"
      default_cache_behavior.1313465292.allowed_methods.0:                                                  "GET"
      default_cache_behavior.1313465292.allowed_methods.1:                                                  "HEAD"
      default_cache_behavior.1313465292.cached_methods.#:                                                   "2"
      default_cache_behavior.1313465292.cached_methods.0:                                                   "GET"
      default_cache_behavior.1313465292.cached_methods.1:                                                   "HEAD"
      default_cache_behavior.1313465292.compress:                                                           "true"
      default_cache_behavior.1313465292.default_ttl:                                                        "86400"
      default_cache_behavior.1313465292.field_level_encryption_id:                                          ""
      default_cache_behavior.1313465292.forwarded_values.#:                                                 "1"
      default_cache_behavior.1313465292.forwarded_values.2759845635.cookies.#:                              "1"
      default_cache_behavior.1313465292.forwarded_values.2759845635.cookies.2625240281.forward:             "none"
      default_cache_behavior.1313465292.forwarded_values.2759845635.cookies.2625240281.whitelisted_names.#: "0"
      default_cache_behavior.1313465292.forwarded_values.2759845635.headers.#:                              "0"
      default_cache_behavior.1313465292.forwarded_values.2759845635.query_string:                           "false"
      default_cache_behavior.1313465292.forwarded_values.2759845635.query_string_cache_keys.#:              "0"
      default_cache_behavior.1313465292.lambda_function_association.#:                                      "0"
      default_cache_behavior.1313465292.max_ttl:                                                            "31536000"
      default_cache_behavior.1313465292.min_ttl:                                                            "0"
      default_cache_behavior.1313465292.smooth_streaming:                                                   ""
      default_cache_behavior.1313465292.target_origin_id:                                                   "howtohypermedia.semanticlink.io"
      default_cache_behavior.1313465292.trusted_signers.#:                                                  "0"
      default_cache_behavior.1313465292.viewer_protocol_policy:                                             "redirect-to-https"
      default_root_object:                                                                                  "index.html"
      domain_name:                                                                                          <computed>
      enabled:                                                                                              "true"
      etag:                                                                                                 <computed>
      hosted_zone_id:                                                                                       <computed>
      http_version:                                                                                         "http2"
      in_progress_validation_batches:                                                                       <computed>
      is_ipv6_enabled:                                                                                      "false"
      last_modified_time:                                                                                   <computed>
      origin.#:                                                                                             "1"
      origin.1656065114.custom_header.#:                                                                    "0"
      origin.1656065114.custom_origin_config.#:                                                             "1"
      origin.1656065114.custom_origin_config.1702400468.http_port:                                          "80"
      origin.1656065114.custom_origin_config.1702400468.https_port:                                         "443"
      origin.1656065114.custom_origin_config.1702400468.origin_keepalive_timeout:                           "5"
      origin.1656065114.custom_origin_config.1702400468.origin_protocol_policy:                             "http-only"
      origin.1656065114.custom_origin_config.1702400468.origin_read_timeout:                                "30"
      origin.1656065114.custom_origin_config.1702400468.origin_ssl_protocols.#:                             "3"
      origin.1656065114.custom_origin_config.1702400468.origin_ssl_protocols.0:                             "TLSv1"
      origin.1656065114.custom_origin_config.1702400468.origin_ssl_protocols.1:                             "TLSv1.1"
      origin.1656065114.custom_origin_config.1702400468.origin_ssl_protocols.2:                             "TLSv1.2"
      origin.1656065114.domain_name:                                                                        "howtohypermedia.semanticlink.io.s3-website-ap-southeast-2.amazonaws.com"
      origin.1656065114.origin_id:                                                                          "howtohypermedia.semanticlink.io"
      origin.1656065114.origin_path:                                                                        ""
      origin.1656065114.s3_origin_config.#:                                                                 "0"
      price_class:                                                                                          "PriceClass_All"
      restrictions.#:                                                                                       "1"
      restrictions.1097372288.geo_restriction.#:                                                            "1"
      restrictions.1097372288.geo_restriction.2625240281.locations.#:                                       "0"
      restrictions.1097372288.geo_restriction.2625240281.restriction_type:                                  "none"
      retain_on_delete:                                                                                     "false"
      status:                                                                                               <computed>
      viewer_certificate.#:                                                                                 "1"
      viewer_certificate.186202422.acm_certificate_arn:                                                     "arn:aws:acm:us-east-1:031040973224:certificate/5aad8769-7f1a-4911-996f-76fa6f0473c2"
      viewer_certificate.186202422.cloudfront_default_certificate:                                          ""
      viewer_certificate.186202422.iam_certificate_id:                                                      ""
      viewer_certificate.186202422.minimum_protocol_version:                                                "TLSv1"
      viewer_certificate.186202422.ssl_support_method:                                                      "sni-only"


Plan: 1 to add, 0 to change, 0 to destroy.

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

aws_cloudfront_distribution.site_distribution: Creating...
  active_trusted_signers.%:                                                                             "" => "<computed>"
  aliases.#:                                                                                            "0" => "1"
  aliases.297710837:                                                                                    "" => "howtohypermedia.semanticlink.io"
  arn:                                                                                                  "" => "<computed>"
  caller_reference:                                                                                     "" => "<computed>"
  default_cache_behavior.#:                                                                             "0" => "1"
  default_cache_behavior.1313465292.allowed_methods.#:                                                  "0" => "2"
  default_cache_behavior.1313465292.allowed_methods.0:                                                  "" => "GET"
  default_cache_behavior.1313465292.allowed_methods.1:                                                  "" => "HEAD"
  default_cache_behavior.1313465292.cached_methods.#:                                                   "0" => "2"
  default_cache_behavior.1313465292.cached_methods.0:                                                   "" => "GET"
  default_cache_behavior.1313465292.cached_methods.1:                                                   "" => "HEAD"
  default_cache_behavior.1313465292.compress:                                                           "" => "true"
  default_cache_behavior.1313465292.default_ttl:                                                        "" => "86400"
  default_cache_behavior.1313465292.field_level_encryption_id:                                          "" => ""
  default_cache_behavior.1313465292.forwarded_values.#:                                                 "0" => "1"
  default_cache_behavior.1313465292.forwarded_values.2759845635.cookies.#:                              "0" => "1"
  default_cache_behavior.1313465292.forwarded_values.2759845635.cookies.2625240281.forward:             "" => "none"
  default_cache_behavior.1313465292.forwarded_values.2759845635.cookies.2625240281.whitelisted_names.#: "0" => "0"
  default_cache_behavior.1313465292.forwarded_values.2759845635.headers.#:                              "0" => "0"
  default_cache_behavior.1313465292.forwarded_values.2759845635.query_string:                           "" => "false"
  default_cache_behavior.1313465292.forwarded_values.2759845635.query_string_cache_keys.#:              "0" => "0"
  default_cache_behavior.1313465292.lambda_function_association.#:                                      "0" => "0"
  default_cache_behavior.1313465292.max_ttl:                                                            "" => "31536000"
  default_cache_behavior.1313465292.min_ttl:                                                            "" => "0"
  default_cache_behavior.1313465292.smooth_streaming:                                                   "" => ""
  default_cache_behavior.1313465292.target_origin_id:                                                   "" => "howtohypermedia.semanticlink.io"
  default_cache_behavior.1313465292.trusted_signers.#:                                                  "0" => "0"
  default_cache_behavior.1313465292.viewer_protocol_policy:                                             "" => "redirect-to-https"
  default_root_object:                                                                                  "" => "index.html"
  domain_name:                                                                                          "" => "<computed>"
  enabled:                                                                                              "" => "true"
  etag:                                                                                                 "" => "<computed>"
  hosted_zone_id:                                                                                       "" => "<computed>"
  http_version:                                                                                         "" => "http2"
  in_progress_validation_batches:                                                                       "" => "<computed>"
  is_ipv6_enabled:                                                                                      "" => "false"
  last_modified_time:                                                                                   "" => "<computed>"
  origin.#:                                                                                             "0" => "1"
  origin.1656065114.custom_header.#:                                                                    "0" => "0"
  origin.1656065114.custom_origin_config.#:                                                             "0" => "1"
  origin.1656065114.custom_origin_config.1702400468.http_port:                                          "" => "80"
  origin.1656065114.custom_origin_config.1702400468.https_port:                                         "" => "443"
  origin.1656065114.custom_origin_config.1702400468.origin_keepalive_timeout:                           "" => "5"
  origin.1656065114.custom_origin_config.1702400468.origin_protocol_policy:                             "" => "http-only"
  origin.1656065114.custom_origin_config.1702400468.origin_read_timeout:                                "" => "30"
  origin.1656065114.custom_origin_config.1702400468.origin_ssl_protocols.#:                             "0" => "3"
  origin.1656065114.custom_origin_config.1702400468.origin_ssl_protocols.0:                             "" => "TLSv1"
  origin.1656065114.custom_origin_config.1702400468.origin_ssl_protocols.1:                             "" => "TLSv1.1"
  origin.1656065114.custom_origin_config.1702400468.origin_ssl_protocols.2:                             "" => "TLSv1.2"
  origin.1656065114.domain_name:                                                                        "" => "howtohypermedia.semanticlink.io.s3-website-ap-southeast-2.amazonaws.com"
  origin.1656065114.origin_id:                                                                          "" => "howtohypermedia.semanticlink.io"
  origin.1656065114.origin_path:                                                                        "" => ""
  origin.1656065114.s3_origin_config.#:                                                                 "0" => "0"
  price_class:                                                                                          "" => "PriceClass_All"
  restrictions.#:                                                                                       "0" => "1"
  restrictions.1097372288.geo_restriction.#:                                                            "0" => "1"
  restrictions.1097372288.geo_restriction.2625240281.locations.#:                                       "0" => "0"
  restrictions.1097372288.geo_restriction.2625240281.restriction_type:                                  "" => "none"
  retain_on_delete:                                                                                     "" => "false"
  status:                                                                                               "" => "<computed>"
  viewer_certificate.#:                                                                                 "0" => "1"
  viewer_certificate.186202422.acm_certificate_arn:                                                     "" => "arn:aws:acm:us-east-1:031040973224:certificate/5aad8769-7f1a-4911-996f-76fa6f0473c2"
  viewer_certificate.186202422.cloudfront_default_certificate:                                          "" => ""
  viewer_certificate.186202422.iam_certificate_id:                                                      "" => ""
  viewer_certificate.186202422.minimum_protocol_version:                                                "" => "TLSv1"
  viewer_certificate.186202422.ssl_support_method:                                                      "" => "sni-only"
aws_cloudfront_distribution.site_distribution: Creation complete after 9s (ID: E2RL5RJ4H1V7PJ)

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.

Outputs:

cloudfront_distribution_domain = d2cgon8nre8m5j.cloudfront.net
```

## Update DNS

```
howtohypermedia.semanticlink.io CNAME d2cgon8nre8m5j.cloudfront.net
```

## Deploy

```bash
cd ..
yarn build
aws s3 cp public/ "s3://howtohypermedia.semanticlink.io/" --recursive
```

Note: the aws command is the `publish` target in `package.json`

# Links

* https://blog.kylegalbraith.com/2018/08/07/how-to-make-an-awesome-blog-using-gatsbyjs-and-aws/
* https://blog.kylegalbraith.com/2018/03/02/adding-free-ssl-certificates-to-static-websites-via-aws-certificate-manager/