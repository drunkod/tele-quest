{
  description = "Development environment for Vite.js with pnpm";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            # Core development tools
            nodejs_20
            pnpm
            git
            curl
            gnumake  # Required for native module builds

            # TypeScript tooling
            nodePackages.typescript
            nodePackages.typescript-language-server

            # Code quality tools
            nodePackages.prettier
            nodePackages.eslint

            # Improved file watching
            watchman
          ];

          shellHook = ''
            # Set UTF-8 encoding for proper character handling
            export LANG=C.UTF-8

            # Welcome message
            echo "🚀 Welcome to Vite.js + pnpm Development Environment"
            echo "Node.js version: $(node --version)"
            echo "pnpm version: $(pnpm --version)"

            # Configure local pnpm store
            export PNPM_HOME="$PWD/node_modules/.pnpm-store"
            mkdir -p "$PNPM_HOME"
            export PATH="$PNPM_HOME:$PATH"

            # Disable npm update notifications for cleaner output
            export NO_UPDATE_NOTIFIER=1

            # Create .gitignore if it doesn't exist
            if [ ! -f .gitignore ]; then
              cat > .gitignore << EOF
node_modules/
.pnpm-store/
dist/
.env
*.log
EOF
            fi

            # Ensure proper permissions for pnpm store
            chmod -R 755 "$PNPM_HOME"
          '';
        };
      });
}