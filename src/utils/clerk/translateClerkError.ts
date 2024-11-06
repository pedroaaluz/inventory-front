export enum ClerkErrorCodesEnum {
  SessionExists = "session_exists",
  IdentifierAlreadySignedIn = "identifier_already_signed_in",
  AccountTransferInvalid = "account_transfer_invalid",
  ClientStateInvalid = "client_state_invalid",
  StrategyForUserInvalid = "strategy_for_user_invalid",
  IdentificationClaimed = "identification_claimed",
  ResourceForbidden = "resource_forbidden",
  ResourceNotFound = "resource_not_found",
  IdentificationBelongsToDifferentUser = "identification_belongs_to_different_user",
  NoSecondFactors = "no_second_factors",
  SignInNoIdentificationForUser = "sign_in_no_identification_for_user",
  SignInIdentificationOrUserDeleted = "sign_in_identification_or_user_deleted",
  SignUpNotFound = "sign_up_not_found",
  SignUpForbiddenAccess = "sign_up_forbidden_access",
  SignUpCannotBeUpdated = "sign_up_cannot_be_updated",
  CaptchaNotEnabled = "captcha_not_enabled",
  SignUpOutdatedVerification = "sign_up_outdated_verification",
  ExternalAccountNotFound = "external_account_not_found",
  IdentificationDeletionFailed = "identification_deletion_failed",
  PhoneNumberExists = "phone_number_exists",
  FormIdentifierNotFound = "form_identifier_not_found",
  CaptchaUnavailable = "captcha_unavailable",
  CaptchaInvalid = "captcha_invalid",
  PasskeyNotSupported = "passkey_not_supported",
  PasskeyPANotSupported = "passkey_pa_not_supported",
  PasskeyRetrievalCancelled = "passkey_retrieval_cancelled",
  PasskeyRegistrationCancelled = "passkey_registration_cancelled",
  PasskeyAlreadyExists = "passkey_already_exists",
  FormPasswordPwned = "form_password_pwned",
  FormPasswordPwnedSignIn = "form_password_pwned__sign_in",
  FormUsernameInvalidLength = "form_username_invalid_length",
  FormUsernameInvalidCharacter = "form_username_invalid_character",
  FormParamFormatInvalid = "form_param_format_invalid",
  FormParamFormatInvalidEmailAddress = "form_param_format_invalid__email_address",
  FormPasswordLengthTooShort = "form_password_length_too_short",
  FormParamNil = "form_param_nil",
  FormCodeIncorrect = "form_code_incorrect",
  FormPasswordIncorrect = "form_password_incorrect",
  FormPasswordValidationFailed = "form_password_validation_failed",
  NotAllowedAccess = "not_allowed_access",
  FormIdentifierExists = "form_identifier_exists",
  FormIdentifierExistsEmailAddress = "form_identifier_exists__email_address",
  FormIdentifierExistsUsername = "form_identifier_exists__username",
  FormIdentifierExistsPhoneNumber = "form_identifier_exists__phone_number",
  FormPasswordNotStrongEnough = "form_password_not_strong_enough",
  FormPasswordSizeInBytesExceeded = "form_password_size_in_bytes_exceeded",
}

const clerkDictionaryErrorTranslated: Record<
  ClerkErrorCodesEnum,
  {
    shortMessage: string;
    longMessage: string | null;
  }
> = {
  // @ts-ignore
  verification_failed: {
    shortMessage: "Verificação falhou",
    longMessage: "A verificação falhou. Por favor, tente novamente.",
  },
  external_account_not_found: {
    shortMessage: "Conta externa não encontrada",
    longMessage: "A conta externa associada não foi encontrada.",
  },
  identification_deletion_failed: {
    shortMessage: "Falha na exclusão da identificação",
    longMessage: "Não foi possível excluir a identificação associada.",
  },
  phone_number_exists: {
    shortMessage: "Número de telefone já existe",
    longMessage: "Este número de telefone já está associado a outra conta.",
  },
  form_identifier_not_found: {
    shortMessage: "usuário não encontrado",
    longMessage: "O usuário fornecido não foi encontrado.",
  },
  captcha_unavailable: {
    shortMessage: "CAPTCHA indisponível",
    longMessage: "O CAPTCHA não está disponível no momento.",
  },
  captcha_invalid: {
    shortMessage: "CAPTCHA inválido",
    longMessage: "O token CAPTCHA fornecido é inválido.",
  },
  passkey_not_supported: {
    shortMessage: "Passkey não suportada",
    longMessage:
      "A chave de acesso não é suportada neste dispositivo ou navegador.",
  },
  passkey_pa_not_supported: {
    shortMessage: "Passkey PA não suportada",
    longMessage:
      "A chave de acesso pública/administrativa (PA) não é suportada.",
  },
  passkey_retrieval_cancelled: {
    shortMessage: "Recuperação da chave de acesso cancelada",
    longMessage: "A recuperação da chave de acesso foi cancelada.",
  },
  passkey_registration_cancelled: {
    shortMessage: "Registro da chave de acesso cancelado",
    longMessage: "O registro da chave de acesso foi cancelado.",
  },
  passkey_already_exists: {
    shortMessage: "Chave de acesso já existe",
    longMessage: "Esta chave de acesso já está registrada.",
  },
  form_password_pwned: {
    shortMessage: "Senha comprometida",
    longMessage:
      "A senha fornecida foi comprometida em uma violação de dados. Por favor, escolha uma senha diferente.",
  },
  form_password_pwned__sign_in: {
    shortMessage: "Senha comprometida (Login)",
    longMessage:
      "A senha fornecida foi comprometida. Você deve alterar sua senha antes de continuar.",
  },
  form_username_invalid_length: {
    shortMessage: "Tamanho do nome de usuário inválido",
    longMessage:
      "O nome de usuário deve ter um tamanho válido conforme as regras do sistema.",
  },
  form_username_invalid_character: {
    shortMessage: "Caracteres inválidos no nome de usuário",
    longMessage:
      "O nome de usuário contém caracteres inválidos, ele deve possui apenas: letras, números e '_' ou '-'.",
  },
  form_param_format_invalid: {
    shortMessage: "Formato do parâmetro inválido",
    longMessage: "O formato do parâmetro fornecido é inválido.",
  },
  form_param_format_invalid__email_address: {
    shortMessage: "Formato de e-mail inválido",
    longMessage: "O formato do endereço de e-mail fornecido é inválido.",
  },
  form_password_length_too_short: {
    shortMessage: "Senha muito curta",
    longMessage:
      "A senha fornecida é muito curta. Por favor, escolha uma senha mais longa.",
  },
  form_param_nil: {
    shortMessage: "Parâmetro ausente",
    longMessage: "Um parâmetro obrigatório está ausente.",
  },
  form_code_incorrect: {
    shortMessage: "Código incorreto",
    longMessage: "O código fornecido está incorreto.",
  },
  form_password_incorrect: {
    shortMessage: "Senha incorreta",
    longMessage: "A senha fornecida está incorreta.",
  },
  form_password_validation_failed: {
    shortMessage: "Falha na validação da senha",
    longMessage: "A senha fornecida não atende aos requisitos de segurança.",
  },
  not_allowed_access: {
    shortMessage: "Acesso não permitido",
    longMessage: "Você não tem permissão para acessar este recurso.",
  },
  form_identifier_exists: {
    shortMessage: "usuário já existe",
    longMessage: "O usuário fornecido já está em uso.",
  },
  form_identifier_exists__email_address: {
    shortMessage: "Endereço de e-mail já existe",
    longMessage:
      "O endereço de e-mail fornecido já está associado a uma conta.",
  },
  form_identifier_exists__username: {
    shortMessage: "Nome de usuário já existe",
    longMessage: "O nome de usuário fornecido já está em uso.",
  },
  form_identifier_exists__phone_number: {
    shortMessage: "Número de telefone já existe",
    longMessage:
      "O número de telefone fornecido já está associado a uma conta.",
  },
  form_password_not_strong_enough: {
    shortMessage: "Senha fraca",
    longMessage:
      "A senha fornecida não atende aos requisitos mínimos de segurança.",
  },
  form_password_size_in_bytes_exceeded: {
    shortMessage: "Tamanho da senha excedido",
    longMessage: "O tamanho da senha em bytes excede o limite permitido.",
  },
  session_exists: {
    shortMessage: "Sessão já existe",
    longMessage:
      "Você está atualmente em modo de sessão única. Você só pode estar logado em uma conta por vez.",
  },
  identifier_already_signed_in: {
    shortMessage: "Você já está logado",
    longMessage: null,
  },
  account_transfer_invalid: {
    shortMessage: "Transferência de conta inválida",
    longMessage: "Não há conta para transferir",
  },
  client_state_invalid: {
    shortMessage: "Ação inválida",
    longMessage: "Não foi possível completar %s para este Cliente. %s",
  },
  strategy_for_user_invalid: {
    shortMessage: "Estratégia de verificação inválida",
    longMessage: "A estratégia de verificação não é válida para esta conta",
  },
  identification_claimed: {
    shortMessage: "Identificação reivindicada por outro usuário",
    longMessage:
      "Um ou mais usuárioes nesta inscrição foram conectados a um usuário diferente. Por favor, inscreva-se novamente.",
  },
  resource_forbidden: {
    shortMessage: "Operação não permitida",
    longMessage:
      "As operações de atualização não são permitidas em logins mais antigos",
  },
  resource_not_found: {
    shortMessage: "Não encontrado",
    longMessage: "Nenhum login foi encontrado com o email fornecido",
  },
  identification_belongs_to_different_user: {
    shortMessage: "Pertence a um usuário diferente",
    longMessage: "A identificação fornecida pertence a um usuário diferente.",
  },
  no_second_factors: {
    shortMessage: "Sem segundos fatores",
    longMessage:
      "Nenhum segundo fator foi encontrado para a estratégia especificada",
  },
  sign_in_no_identification_for_user: {
    shortMessage: "Sem identificação para o usuário",
    longMessage:
      "O token fornecido não tem uma identificação associada ao usuário que o criou",
  },
  sign_in_identification_or_user_deleted: {
    shortMessage: "Identificação ou usuário excluído",
    longMessage:
      "O usuário ou a identificação selecionada foram excluídos. Por favor, comece de novo.",
  },
  sign_up_not_found: {
    shortMessage: "Inscrição não encontrada",
    longMessage: "Nenhuma inscrição foi encontrada com o ID fornecido",
  },
  sign_up_forbidden_access: {
    shortMessage: "Acesso à inscrição proibido",
    longMessage: "O acesso a esta inscrição é proibido",
  },
  sign_up_cannot_be_updated: {
    shortMessage: "Inscrição não pode ser atualizada",
    longMessage:
      "Esta inscrição atingiu um estado terminal e não pode ser atualizada",
  },
  captcha_not_enabled: {
    shortMessage: "CAPTCHA não habilitado",
    longMessage:
      "A detecção de bots só pode ser aplicada para instâncias de produção que tenham o CAPTCHA habilitado.",
  },
  sign_up_outdated_verification: {
    shortMessage: "Verificação desatualizada",
    longMessage:
      "Há uma verificação mais recente pendente para esta inscrição. Tente realizar a verificação novamente.",
  },
};

export function translateClerkError(errorCode: ClerkErrorCodesEnum) {
  const result = clerkDictionaryErrorTranslated[errorCode];
  return result
    ? result
    : {
        shortMessage: "Erro desconhecido",
        longMessage: null,
      };
}
