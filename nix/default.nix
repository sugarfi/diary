let
    pkgs = import <nixpkgs> {};
in
pkgs.mkShell {
    name = "diary-dev";
    buildInputs = with pkgs; [ nodejs ];
}
