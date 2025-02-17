#!/bin/bash

# Diretório onde estão os ícones
ICON_DIR="./src/assets/icons"

# Arquivo de saída
OUTPUT_FILE="$ICON_DIR/icons.json"

# Verifica se o diretório existe
if [ ! -d "$ICON_DIR" ]; then
  echo "Diretório $ICON_DIR não encontrado. Criando..."
  mkdir -p "$ICON_DIR"
fi

# Gera o arquivo JSON com a lista de ícones
echo "Gerando lista de ícones em $OUTPUT_FILE..."

# Lista os arquivos .svg, remove a extensão e cria um JSON
icons=$(find "$ICON_DIR" -maxdepth 1 -type f -name "*.svg" | sed 's|.*/||' | sed 's|\.svg$||' | jq -R -s 'split("\n")[:-1]')

# Salva a lista no arquivo icons.json
echo "$icons" > "$OUTPUT_FILE"

echo "Lista de ícones gerada com sucesso!"
