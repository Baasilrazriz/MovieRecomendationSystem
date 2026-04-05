"""
Configuration validator script
Verify that all required environment variables are properly loaded

Usage: python verify_config.py
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def verify_config():
    """Check if all required environment variables are set"""
    
    print("🔍 Verifying Configuration...\n")
    print("=" * 50)
    
    # Required environment variables
    required_vars = ['SECRET_KEY', 'DEBUG', 'ENVIRONMENT']
    optional_vars = ['OMDB_API_KEY']
    
    all_good = True
    
    # Check required variables
    print("\n✓ REQUIRED ENVIRONMENT VARIABLES:")
    for var in required_vars:
        value = os.getenv(var)
        if value:
            # Mask sensitive values
            if 'SECRET' in var or 'API' in var or 'KEY' in var:
                display_val = value[:8] + "..." if len(value) > 8 else "***"
            else:
                display_val = value
            print(f"  ✓ {var:<20} = {display_val}")
        else:
            print(f"  ✗ {var:<20} = NOT SET ⚠️")
            all_good = False
    
    # Check optional variables
    print("\n✓ OPTIONAL ENVIRONMENT VARIABLES:")
    for var in optional_vars:
        value = os.getenv(var)
        if value:
            display_val = value[:8] + "..." if len(value) > 8 else "***"
            print(f"  ✓ {var:<20} = {display_val}")
        else:
            print(f"  ○ {var:<20} = not set (optional)")
    
    print("\n" + "=" * 50)
    
    # Validate specific values
    print("\n🔧 VALIDATION DETAILS:\n")
    
    debug_val = os.getenv('DEBUG', 'False').lower()
    if debug_val in ('true', 'false', '1', '0'):
        print(f"  ✓ DEBUG mode: {debug_val}")
    else:
        print(f"  ✗ DEBUG value invalid: {debug_val} (use: true/false)")
        all_good = False
    
    environment = os.getenv('ENVIRONMENT', 'development')
    valid_envs = ['development', 'production', 'staging']
    if environment in valid_envs:
        print(f"  ✓ ENVIRONMENT: {environment}")
    else:
        print(f"  ⚠️  ENVIRONMENT: {environment} (should be: {', '.join(valid_envs)})")
    
    secret_key = os.getenv('SECRET_KEY')
    if secret_key and len(secret_key) > 20:
        print(f"  ✓ SECRET_KEY length: {len(secret_key)} chars (good)")
    else:
        print(f"  ✗ SECRET_KEY too short or not set")
        all_good = False
    
    print("\n" + "=" * 50)
    
    if all_good:
        print("\n✅ Configuration Valid! Ready to run.\n")
        return True
    else:
        print("\n❌ Configuration issues found. Please fix above errors.\n")
        print("   Check your .env file and ensure all required variables are set.")
        return False

if __name__ == "__main__":
    success = verify_config()
    exit(0 if success else 1)
