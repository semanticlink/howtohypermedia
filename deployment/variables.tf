variable "aws_region" {
  description = "The AWS region to deploy into (default: us-west-2)."
  default     = "ap-southeast-2"
}

variable "aws_profile" {
  description = "The AWS user that is stored an the non-default profile in .aws/config."
  default     = "todo-admin"
}

variable "site_url" {
  description = "The url for How To Hypermedia"
  default     = "howtohypermedia.semanticlink.io"
}

variable "acm_certificate_arn" {
  description = "ARN for the AWS Certificate Manager SSL certificate (Note: needs to be in N. Virginia)"
  default     = "arn:aws:acm:us-east-1:031040973224:certificate/5aad8769-7f1a-4911-996f-76fa6f0473c2"
}