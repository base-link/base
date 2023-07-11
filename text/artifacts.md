# Artifacts in Base Link

This is how you would define them.

```
# resource in terraform
seed google-storage-bucket
  bind name, <foo>
  bind location, text <US>
  bind uniform-bucket-level-access, term true

# data in terraform
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

This is how the values would be saved in a sort of `seed.link` file.

```
base <1.2.3>

seed example, like aws-instance
  sort managed
  bind ami, <ami-0fb653ca2d3203ac1>
  bind availability-zone, <us-east-2b>
```

Saved remotely using a cloud provider using the moon framework.

```
base bind site # with moon installed
```
