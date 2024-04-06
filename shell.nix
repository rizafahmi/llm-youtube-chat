with import <nixpkgs> {};
let
  basePackages = [
    nodejs_20
    awscli2
  ];
in
  pkgs.mkShellNoCC {
    buildInputs = basePackages;
  }