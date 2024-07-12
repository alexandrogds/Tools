#!/usr/bin/env python3

import os
import geoip2.database

print('start')

def determinar_idioma_por_ip(ip):
    print('func started')
    print(ip)
    # Path para o banco de dados GeoIP
    path_banco_dados = 'GeoLite2-Country.mmdb'  # Altere para o caminho correto do seu banco de dados GeoIP

    # Carregar o banco de dados GeoIP
    reader = geoip2.database.Reader(path_banco_dados)

    try:
        # Consultar o país associado ao IP
        response = reader.country(ip)
        codigo_pais = response.country.iso_code

        # Mapear o código do país para o idioma correspondente
        pais_para_idioma = {'ZA': 'af', 'AL': 'sq', 'ET': 'am', 'SA': 'ar', 'AM': 'hy', 'AZ': 'az', 'ES': 'eu', 'BY': 'be', 'BD': 'bn', 'BA': 'bs', 'BG': 'bg', 'ES': 'ca', 'PH': 'ceb', 'MW': 'ny', 'CN': 'zh', 'TW': 'zh-TW', 'FR': 'co', 'HR': 'hr', 'CZ': 'cs', 'DK': 'da', 'NL': 'nl', 'US': 'en', 'XK': 'eo', 'EE': 'et', 'PH': 'tl', 'FI': 'fi', 'FR': 'fr', 'NL': 'fy', 'ES': 'gl', 'GE': 'ka', 'DE': 'de', 'GR': 'el', 'IN': 'gu', 'HT': 'ht', 'NG': 'ha', 'US': 'haw', 'IL': 'he', 'IN': 'hi', 'CN': 'hmn', 'HU': 'hu', 'IS': 'is', 'NG': 'ig', 'ID': 'id', 'IE': 'ga', 'IT': 'it', 'JP': 'ja', 'ID': 'jw', 'IN': 'kn', 'KZ': 'kk', 'KH': 'km', 'RW': 'rw', 'KR': 'ko', 'IQ': 'ku', 'KG': 'ky', 'LA': 'lo', 'VA': 'la', 'LV': 'lv', 'LT': 'lt', 'LU': 'lb', 'MK': 'mk', 'MG': 'mg', 'MY': 'ms', 'IN': 'ml', 'MT': 'mt', 'NZ': 'mi', 'IN': 'mr', 'MN': 'mn', 'MM': 'my', 'NP': 'ne', 'NO': 'no', 'IN': 'or', 'AF': 'ps', 'IR': 'fa', 'PL': 'pl', 'BR': 'pt', 'IN': 'pa', 'RO': 'ro', 'RU': 'ru', 'WS': 'sm', 'GB': 'gd', 'RS': 'sr', 'LS': 'st', 'ZW': 'sn', 'PK': 'sd', 'LK': 'si', 'SK': 'sk', 'SI': 'sl', 'SO': 'so', 'ES': 'es', 'ID': 'su', 'TZ': 'sw', 'SE': 'sv', 'TJ': 'tg', 'IN': 'ta', 'RU': 'tt', 'IN': 'te', 'TH': 'th', 'TR': 'tr', 'TM': 'tk', 'UA': 'uk', 'PK': 'ur', 'CN': 'ug', 'UZ': 'uz', 'VN': 'vi', 'GB': 'cy', 'ZA': 'xh', 'IL': 'yi', 'NG': 'yo', 'ZA': 'zu'}
        return pais_para_idioma.get(codigo_pais, 'en')

    except geoip2.errors.AddressNotFoundError:
        # Tratar caso o IP não seja encontrado no banco de dados GeoIP
        return 'en'  # Retornar um idioma padrão

    finally:
        # Fechar o leitor do banco de dados GeoIP
        reader.close()
    
        print('fnc end')

# Exemplo de uso
ip_usuario = os.environ.get('REMOTE_ADDR')
idioma = determinar_idioma_por_ip(ip_usuario)
print(f"{idioma}")

print('end')