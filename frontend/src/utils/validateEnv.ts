// Environment Variable Validation Utility

/**
 * Validates an Ethereum address format
 * @param address - The address to validate
 * @returns Object with isValid flag and error message if invalid
 */
function validateEthereumAddress(address: string | undefined): {
  isValid: boolean
  error?: string
} {
  if (!address) {
    return { isValid: false }
  }

  // Check if address starts with '0x'
  if (!address.startsWith('0x')) {
    return {
      isValid: false,
      error: 'VITE_PIGGYBANK_ADDRESS must be a valid Ethereum address starting with "0x" (e.g., 0x1234...5678)'
    }
  }

  // Check if address has correct length (42 characters including '0x')
  if (address.length !== 42) {
    return {
      isValid: false,
      error: `VITE_PIGGYBANK_ADDRESS must be exactly 42 characters long (including "0x"). Current length: ${address.length}`
    }
  }

  // Check if remaining characters are valid hex
  const hexPart = address.slice(2)
  const isValidHex = /^[0-9a-fA-F]+$/.test(hexPart)
  if (!isValidHex) {
    return {
      isValid: false,
      error: 'VITE_PIGGYBANK_ADDRESS must contain only valid hexadecimal characters (0-9, a-f, A-F) after "0x"'
    }
  }

  return { isValid: true }
}

export function validateEnvironment() {
  const errors: string[] = []
  const warnings: string[] = []

  // Check REOWN Project ID
  const projectId = import.meta.env.VITE_REOWN_PROJECT_ID
  if (!projectId) {
    errors.push('VITE_REOWN_PROJECT_ID is not set. Get one from https://cloud.reown.com/')
  } else if (projectId.length < 32) {
    warnings.push('VITE_REOWN_PROJECT_ID seems too short. Verify it is correct.')
  }

  // Check PiggyBank Address with consolidated validation
  const contractAddress = import.meta.env.VITE_PIGGYBANK_ADDRESS
  if (!contractAddress) {
    warnings.push('VITE_PIGGYBANK_ADDRESS is not set. Smart contract features will not work until you deploy and configure the contract address.')
  } else {
    const addressValidation = validateEthereumAddress(contractAddress)
    if (!addressValidation.isValid && addressValidation.error) {
      errors.push(addressValidation.error)
    }
  }

  // Log results
  if (errors.length > 0) {
    console.error('❌ Environment Configuration Errors:')
    errors.forEach(error => console.error(`  - ${error}`))
  }

  if (warnings.length > 0) {
    console.warn('⚠️  Environment Configuration Warnings:')
    warnings.forEach(warning => console.warn(`  - ${warning}`))
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ Environment configuration is valid')
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

export function getEnvironmentInfo() {
  return {
    projectId: import.meta.env.VITE_REOWN_PROJECT_ID ? '✅ Set' : '❌ Missing',
    contractAddress: import.meta.env.VITE_PIGGYBANK_ADDRESS ? '✅ Set' : '⚠️  Not Set',
    mode: import.meta.env.MODE,
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD
  }
}
