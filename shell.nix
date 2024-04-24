with import <nixpkgs> {};
let
  basePackages = [
    nodejs_20
    awscli2
    bun
  ];
in
  pkgs.mkShellNoCC {
    buildInputs = basePackages;
  }