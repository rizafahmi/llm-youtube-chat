with import <nixpkgs> {};
let
  basePackages = [
    nodejs_20
    awscli2
    deno
  ];
in
  pkgs.mkShellNoCC {
    buildInputs = basePackages;
  }