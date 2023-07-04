# Platform Integration

## Inspiration

- [fog](https://github.com/fog/fog)
- [terraform](https://github.com/hashicorp/terraform)

## Vercel Integration

Building on top of Vercel is one option.

```
hook /login, task login
  bind edge, term true

hook /logout, task logout
  bind edge, term false
```

```
# host/base.link

host platform, term vercel
host database, term postgres
```

```
# host/hide.link
# environment secrets

host wikidata-client-key, 123123
```

## Google Cloud Integration

Building on top of Google Cloud is another option.

```
host platform, term google-cloud
host file-storage, term google-cloud-storage
```

- https://github.com/fog/fog-google/tree/master/lib/fog
- https://getbetterdevops.io/google-cloud-functions-with-terraform/

```
seed google-storage-bucket
  bind name, "${random_id.default.hex}-gcf-source"
  bind location, text <US>
  bind uniform-bucket-level-access, term true

data "aws_ami" "app_ami" {
  most_recent = true
  filter {
    name   = "name"
    values = ["app-*"]
  }
}

need app-ami, like aws-ami
  bind most-recent, term true

seed app, like aws-instance
  bind ami, "${data.aws_ami.app_ami.id}"
  bind instance-type, <t2.micro>

seed default, like google-cloudfunctions2-function
  bind name, <function-v2>
  bind location, <us-central1>
  bind description, <a new function>

  bind build-config
    bind runtime, <nodejs16>
    bind entry-point, <helloHttp> # Set the entry point
    bind source
      bind storage-source
        bind bucket, loan google-storage-bucket.default.name
        bind object, loan google-storage-bucket-object.object.name

save project-id, <123>

tool google
  bind project, loan project-id
  bind region, loan region
```

A `link` or `tell` is a variable which can be set from the outside.

```
link mesh
  link storage-sizes, like mesh
    bind usd5, <1xCPU-1GB>
    bind usd10, <1xCPU-2GB>
    note <Storage sizes>

save mesh/plan, <20USD>
```

```
seed server1, like upcloud-server
  bind hostname, loan plan
```

It gets saved into a terraform "state" file.

```json
{
  "version": 4,
  "terraform_version": "1.2.3",
  "serial": 1,
  "lineage": "86545604-7463-4aa5-e9e8-a2a221de98d2",
  "outputs": {},
  "resources": [
    {
      "mode": "managed",
      "type": "aws_instance",
      "name": "example",
      "provider": "provider[\"registry.terraform.io/...\"]",
      "instances": [
        {
          "schema_version": 1,
          "attributes": {
            "ami": "ami-0fb653ca2d3203ac1",
            "availability_zone": "us-east-2b",
            "id": "i-0bc4bbe5b84387543",
            "instance_state": "running",
            "instance_type": "t2.micro",
            "(...)": "(truncated)"
          }
        }
      ]
    }
  ]
}
```

```
base <1.2.3>

seed example, like aws-instance
  sort managed
  bind ami, <ami-0fb653ca2d3203ac1>
  bind availability-zone, <us-east-2b>
```

- https://stackoverflow.com/questions/38486335/should-i-commit-tfstate-files-to-git
- https://github.com/mdb/terraform-example/blob/master/terraform/terraform.tfstate
- [Example Terraform State Files](https://gist.github.com/lancejpollard/1fbf133fdfd2bfcf96a29705ffd2e385)

Saved locally to `bind.link`.

Saved remotely using a cloud provider using the crow framework.

```
base bind # with crow installed
```

```
/back # backend
  /bind # migrations
    /base # database
    /site # infrastructure
/deck # custom packages
/face # frontend
  /dock # ui components
  /wall # pages
/hook # api
/host
  /lock.link # commit this
  /role.link
  /show.link # logs
  /hide
    /bind.link # don't commit this
    /nest.link # env variables, don't commit
/line # command line processing
/link
  /head
  /tree
/make
  /javascript
    /browser
    /node
/read # guides
/tool # shared
/work # dev helpers
/base.link # commit this
```

For libraries, you have:

```
/code
```

For sites, you have:

```
/back
/face
/hook
/task
```
