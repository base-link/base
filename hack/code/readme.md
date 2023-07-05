# Platform Integration

- declarative data model queries
- declarative database schema formation
- declarative infrastructure provisioning
- declarative ui components
- declarative parsing
- declarative text generation
- declarative apis
- declarative clis
- declarative beats

The only other portion is writing the actual imperative logic to
implement some actions. How much further can it be taken?

## Inspiration

- [fog](https://github.com/fog/fog)
- [terraform](https://github.com/hashicorp/terraform)
- [pundit](https://github.com/varvet/pundit)
- [atlas](https://github.com/ariga/atlas)
  - https://github.com/ariga/atlas/blob/master/sql/mysql/diff.go#L36

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
base bind site # with crow installed
```

```
/.gitignore
/back # backend
  /note # mailers
  /work # jobs
  /time # cron jobs
  /task # handle API calls
  /hook # REST and webhook handlers
/bind # configuration
  /lock.link # commit this
  /role.link
  /text.link # copy
  /kink.link # errors
  /form # schema
    /user
  /rule # policies/permissions
  /take.link # query allowance
  /vibe.link # global styles
  /base # database
    /seed # seeding data
    /move # migrations
  /site # infrastructure
    /hold.link # don't commit this
    /move # migrations
  /host # env variables, don't commit
    /test.link
    /base.link
    /work.link # dev
    /beat.link # prod
/book # guides
/deck # custom packages
/face # frontend
  /dock # ui components
  /vibe # styles/themes
  /wall # pages
    /host
      /base.link
      /case.link
      /deck
        /base.link
        /case.link
  /text # copy
/file # public directory
  /text # fonts
  /view # images
/hook # api
  /take
  /save
  /task # queries
/line # command line processing
/link
  /hint.link
  /head
  /tree
/make
  /javascript
    /browser
    /node
/flow # logs
  /work.link # dev logs
  /test.link # test logs
  /beat.link # prod logs
/task # dev helpers
/test
/host # shared
  /tree
/base.link # commit this
/hold # scratchpad/tmp folder
```

For libraries, you have:

```
/code
/task
```

For sites, you have:

```
/back
/face
/hook
/line
/task
```

## Beats

```
beat x5-4
  tick x
  tick o
  tick o
  tick x
```

## Errors

```
kink undefined-form
  code 12
  take form
  note <Form is {{form}}>
  hint <Try a different form>
```

```rs
fn does_things() -> Result<u32, IoError> {
    let res1 = match can_fail() {
        Ok(v) => v,
        Err(e) => return Err(e)
    };

    let res2 = match can_fail() {
        Ok(v) => v,
        Err(e) => return Err(e)
    };

    return Ok(res1 + res2);
}

fn does_things() -> Result<u32, IoError> {
    let res1 = try!(canFail())
    let res2 = try!(canFail())
    return Ok(res1 + res2);
}
```

```
task does-things
  like result
    like u32
    like io-error

  save res1, call can-fail
  save ok1
    stem case
      call read-form
        loan res1
      case ok
        loan res1/value
      case kink
        back res1

  save ok, fuse try, call can-fail
```

```
tree try
  take result

  hook fuse
    stem case
      call read-form
        loan result
      case ok
        loan result/value
      case kink
        back result
```

```
bind.link # Platform Bindings
bolt.link # Standard Library
loom.link # Compiler Framework / TypeChecking / etc.
fish.link # Linting/Printing Framework (Language Server)
  note <Takes the compiler output and generates code from it.>
  /code
    /text
      /:text
        /rule
          /:rule
    /task
tree.link # Content Grammars and Parsing
  /code
    /content
      /pdf
    /task
star.link # Third-party library like with GitHub and Vercel
snow.link # Modeling Framework / Querying
moon.link # Resource Provisioning
crow.link # UI Framework like React
nest.link # Site Framework (last remaining folders)
seed.link # Math Framework
wolf.link # CLI/REPL Framework
base.link # Package Framework
door.link # Security/User/Rate Limiting Framework
```

Compiler needs to know about:

- link folder for decks and dependencies
- make folder for compiling to target
- bind folder for configuration
- book folder for readme
- deck file for parsing decks
- flow folder for logs
- test folder for tests

All that's left is the "code" part of the app.

The dock (view) is part of the code file type, so that is known by the
compiler.

The compiler would know about the framework?!! The compiler is the
framework basically.

The compiler is aware of:

- platform bindings
- standard library
