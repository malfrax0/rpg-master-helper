import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: {
        "http://localhost:4000/api": {
            headers: {
                Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ilh5eVVLajZkcUhXcGhtSTdlMVVYMCJ9.eyJpc3MiOiJodHRwczovL2Rldi1mMmoyaTdoenY0MWc4bGdlLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NTQ2NDU2NjRhMDc0Yzk1Y2Y5ZjQ1MzIiLCJhdWQiOlsiaHR0cHM6Ly9hcGkucm9sZXBsYXlpbmdoZWxwZXIuY29tIiwiaHR0cHM6Ly9kZXYtZjJqMmk3aHp2NDFnOGxnZS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjk5MTExMzc0LCJleHAiOjE2OTkxOTc3NzQsImF6cCI6ImE4NFY4WlpEZGRrRUZsSzRYNXF4SlFaOHdiTUd5bklKIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInBlcm1pc3Npb25zIjpbInJwaDpyb290IiwicnBoOnRlbXBsYXRlOmNyZWF0ZSIsInJwaDp0ZW1wbGF0ZTpkZWxldGUiLCJycGg6dGVtcGxhdGU6dXBkYXRlIl19.cG9fVuUrTCV9u_Mg-GchAP9h75LP2O2W2xa79mYGOZ4JG_OIOa8A9WP9gw_1b_EgCGztJjwxuU9ztNb6fF16-dnKRat1YWcfA8UKWzmKm-yT78fMyxVFD7L5xaQSdP5JH9yIBKnMNaPZe2jwd1zaMJMOU95aHqpN5iInT1OIFFkiImt4CQuFLjP-_ftqO779qGXycD12xHUrYw1buA9e_Vw_KwK_OeV7CLyN_9ryKHyHIFzk3_r8lgZOBydxXlIAqzKPHe8zmBInM0Oz6kUNWyjUGi5_iQRdXtoLQ7MVxYn3nTMiludsd3vGfVu7P8CNTOJeSuZbyQPfbdjfYwpZSQ"
            }
        }
    },
    documents: ['src/**/*.{ts,tsx}'],
    generates: {
        './src/__generated__/': {
            preset: 'client',
            plugins: [],
            presetConfig: {
                gqlTagName: 'gql'
            }
        }
    },
    ignoreNoDocuments: true,
};

export default config;