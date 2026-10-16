#!/bin/bash
# Called by the first-workflow.yml lab (slide 21)
echo "Running ascii-script.sh on $(uname -s)"
cowsay -f tux "Hello from a script in the repo"
