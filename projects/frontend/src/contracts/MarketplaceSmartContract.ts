/* eslint-disable */
// @ts-nocheck
/**
 * This file was automatically generated by @algorandfoundation/algokit-client-generator.
 * DO NOT MODIFY IT BY HAND.
 * requires: @algorandfoundation/algokit-utils: ^2
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import type {
  ABIAppCallArg,
  AppCallTransactionResult,
  AppCallTransactionResultOfType,
  AppCompilationResult,
  AppReference,
  AppState,
  AppStorageSchema,
  CoreAppCallArgs,
  RawAppCallArgs,
  TealTemplateParams,
} from '@algorandfoundation/algokit-utils/types/app'
import type {
  AppClientCallCoreParams,
  AppClientCompilationParams,
  AppClientDeployCoreParams,
  AppDetails,
  ApplicationClient,
} from '@algorandfoundation/algokit-utils/types/app-client'
import type { AppSpec } from '@algorandfoundation/algokit-utils/types/app-spec'
import type { SendTransactionResult, TransactionToSign, SendTransactionFrom, SendTransactionParams } from '@algorandfoundation/algokit-utils/types/transaction'
import type { ABIResult, TransactionWithSigner } from 'algosdk'
import { Algodv2, OnApplicationComplete, Transaction, AtomicTransactionComposer, modelsv2 } from 'algosdk'
export const APP_SPEC: AppSpec = {
  "hints": {
    "createApplication(asset,uint64)void": {
      "call_config": {
        "no_op": "CREATE"
      }
    },
    "setPrice(uint64)void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "optInToAsset(pay)void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "buy(pay,uint64)void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "deleteApplication()void": {
      "call_config": {
        "delete_application": "CALL"
      }
    }
  },
  "source": {
    "approval": "I3ByYWdtYSB2ZXJzaW9uIDEwCgpzbWFydF9jb250cmFjdHMuZXhjaGFuZ2VfcG9pbnRzLmNvbnRyYWN0Lk1hcmtldHBsYWNlU21hcnRDb250cmFjdC5hcHByb3ZhbF9wcm9ncmFtOgogICAgY2FsbHN1YiBfX3B1eWFfYXJjNF9yb3V0ZXJfXwogICAgcmV0dXJuCgoKLy8gc21hcnRfY29udHJhY3RzLmV4Y2hhbmdlX3BvaW50cy5jb250cmFjdC5NYXJrZXRwbGFjZVNtYXJ0Q29udHJhY3QuX19wdXlhX2FyYzRfcm91dGVyX18oKSAtPiB1aW50NjQ6Cl9fcHV5YV9hcmM0X3JvdXRlcl9fOgogICAgcHJvdG8gMCAxCiAgICB0eG4gTnVtQXBwQXJncwogICAgYnogX19wdXlhX2FyYzRfcm91dGVyX19fYWZ0ZXJfaWZfZWxzZUAxMAogICAgbWV0aG9kICJjcmVhdGVBcHBsaWNhdGlvbihhc3NldCx1aW50NjQpdm9pZCIKICAgIG1ldGhvZCAic2V0UHJpY2UodWludDY0KXZvaWQiCiAgICBtZXRob2QgIm9wdEluVG9Bc3NldChwYXkpdm9pZCIKICAgIG1ldGhvZCAiYnV5KHBheSx1aW50NjQpdm9pZCIKICAgIG1ldGhvZCAiZGVsZXRlQXBwbGljYXRpb24oKXZvaWQiCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAwCiAgICBtYXRjaCBfX3B1eWFfYXJjNF9yb3V0ZXJfX19jcmVhdGVBcHBsaWNhdGlvbl9yb3V0ZUAyIF9fcHV5YV9hcmM0X3JvdXRlcl9fX3NldFByaWNlX3JvdXRlQDMgX19wdXlhX2FyYzRfcm91dGVyX19fb3B0SW5Ub0Fzc2V0X3JvdXRlQDQgX19wdXlhX2FyYzRfcm91dGVyX19fYnV5X3JvdXRlQDUgX19wdXlhX2FyYzRfcm91dGVyX19fZGVsZXRlQXBwbGljYXRpb25fcm91dGVANgogICAgaW50IDAKICAgIHJldHN1YgoKX19wdXlhX2FyYzRfcm91dGVyX19fY3JlYXRlQXBwbGljYXRpb25fcm91dGVAMjoKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydCAvLyBPbkNvbXBsZXRpb24gaXMgTm9PcAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgICEKICAgIGFzc2VydCAvLyBpcyBjcmVhdGluZwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgYnRvaQogICAgdHhuYXMgQXNzZXRzCiAgICB0eG5hIEFwcGxpY2F0aW9uQXJncyAyCiAgICBidG9pCiAgICBjYWxsc3ViIGNyZWF0ZUFwcGxpY2F0aW9uCiAgICBpbnQgMQogICAgcmV0c3ViCgpfX3B1eWFfYXJjNF9yb3V0ZXJfX19zZXRQcmljZV9yb3V0ZUAzOgogICAgdHhuIE9uQ29tcGxldGlvbgogICAgIQogICAgYXNzZXJ0IC8vIE9uQ29tcGxldGlvbiBpcyBOb09wCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYXNzZXJ0IC8vIGlzIG5vdCBjcmVhdGluZwogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgYnRvaQogICAgY2FsbHN1YiBzZXRQcmljZQogICAgaW50IDEKICAgIHJldHN1YgoKX19wdXlhX2FyYzRfcm91dGVyX19fb3B0SW5Ub0Fzc2V0X3JvdXRlQDQ6CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICAhCiAgICBhc3NlcnQgLy8gT25Db21wbGV0aW9uIGlzIE5vT3AKICAgIHR4biBBcHBsaWNhdGlvbklECiAgICBhc3NlcnQgLy8gaXMgbm90IGNyZWF0aW5nCiAgICB0eG4gR3JvdXBJbmRleAogICAgaW50IDEKICAgIC0KICAgIGR1cAogICAgZ3R4bnMgVHlwZUVudW0KICAgIGludCBwYXkKICAgID09CiAgICBhc3NlcnQgLy8gdHJhbnNhY3Rpb24gdHlwZSBpcyBwYXkKICAgIGNhbGxzdWIgb3B0SW5Ub0Fzc2V0CiAgICBpbnQgMQogICAgcmV0c3ViCgpfX3B1eWFfYXJjNF9yb3V0ZXJfX19idXlfcm91dGVANToKICAgIHR4biBPbkNvbXBsZXRpb24KICAgICEKICAgIGFzc2VydCAvLyBPbkNvbXBsZXRpb24gaXMgTm9PcAogICAgdHhuIEFwcGxpY2F0aW9uSUQKICAgIGFzc2VydCAvLyBpcyBub3QgY3JlYXRpbmcKICAgIHR4biBHcm91cEluZGV4CiAgICBpbnQgMQogICAgLQogICAgZHVwCiAgICBndHhucyBUeXBlRW51bQogICAgaW50IHBheQogICAgPT0KICAgIGFzc2VydCAvLyB0cmFuc2FjdGlvbiB0eXBlIGlzIHBheQogICAgdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQogICAgYnRvaQogICAgY2FsbHN1YiBidXkKICAgIGludCAxCiAgICByZXRzdWIKCl9fcHV5YV9hcmM0X3JvdXRlcl9fX2RlbGV0ZUFwcGxpY2F0aW9uX3JvdXRlQDY6CiAgICB0eG4gT25Db21wbGV0aW9uCiAgICBpbnQgRGVsZXRlQXBwbGljYXRpb24KICAgID09CiAgICBhc3NlcnQgLy8gT25Db21wbGV0aW9uIGlzIERlbGV0ZUFwcGxpY2F0aW9uCiAgICB0eG4gQXBwbGljYXRpb25JRAogICAgYXNzZXJ0IC8vIGlzIG5vdCBjcmVhdGluZwogICAgY2FsbHN1YiBkZWxldGVBcHBsaWNhdGlvbgogICAgaW50IDEKICAgIHJldHN1YgoKX19wdXlhX2FyYzRfcm91dGVyX19fYWZ0ZXJfaWZfZWxzZUAxMDoKICAgIGludCAwCiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMuZXhjaGFuZ2VfcG9pbnRzLmNvbnRyYWN0Lk1hcmtldHBsYWNlU21hcnRDb250cmFjdC5jcmVhdGVBcHBsaWNhdGlvbihhc3NldElkOiB1aW50NjQsIHVuaXRhcnlQcmljZTogdWludDY0KSAtPiB2b2lkOgpjcmVhdGVBcHBsaWNhdGlvbjoKICAgIHByb3RvIDIgMAogICAgYnl0ZSAiYXNzZXRJZCIKICAgIGZyYW1lX2RpZyAtMgogICAgYXBwX2dsb2JhbF9wdXQKICAgIGJ5dGUgInVuaXRhcnlQcmljZSIKICAgIGZyYW1lX2RpZyAtMQogICAgYXBwX2dsb2JhbF9wdXQKICAgIHJldHN1YgoKCi8vIHNtYXJ0X2NvbnRyYWN0cy5leGNoYW5nZV9wb2ludHMuY29udHJhY3QuTWFya2V0cGxhY2VTbWFydENvbnRyYWN0LnNldFByaWNlKHVuaXRhcnlQcmljZTogdWludDY0KSAtPiB2b2lkOgpzZXRQcmljZToKICAgIHByb3RvIDEgMAogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYXNzZXJ0CiAgICBieXRlICJ1bml0YXJ5UHJpY2UiCiAgICBmcmFtZV9kaWcgLTEKICAgIGFwcF9nbG9iYWxfcHV0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMuZXhjaGFuZ2VfcG9pbnRzLmNvbnRyYWN0Lk1hcmtldHBsYWNlU21hcnRDb250cmFjdC5vcHRJblRvQXNzZXQobWJyUGF5OiB1aW50NjQpIC0+IHZvaWQ6Cm9wdEluVG9Bc3NldDoKICAgIHByb3RvIDEgMAogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYXNzZXJ0CiAgICBnbG9iYWwgQ3VycmVudEFwcGxpY2F0aW9uQWRkcmVzcwogICAgaW50IDAKICAgIGJ5dGUgImFzc2V0SWQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIHNlbGYuYXNzZXRJZCBleGlzdHMKICAgIGFzc2V0X2hvbGRpbmdfZ2V0IEFzc2V0QmFsYW5jZQogICAgYnVyeSAxCiAgICAhCiAgICBhc3NlcnQKICAgIGZyYW1lX2RpZyAtMQogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYXNzZXJ0CiAgICBmcmFtZV9kaWcgLTEKICAgIGd0eG5zIEFtb3VudAogICAgZ2xvYmFsIE1pbkJhbGFuY2UKICAgIGdsb2JhbCBBc3NldE9wdEluTWluQmFsYW5jZQogICAgKwogICAgPT0KICAgIGFzc2VydAogICAgaXR4bl9iZWdpbgogICAgaW50IDAKICAgIGJ5dGUgImFzc2V0SWQiCiAgICBhcHBfZ2xvYmFsX2dldF9leAogICAgYXNzZXJ0IC8vIGNoZWNrIHNlbGYuYXNzZXRJZCBleGlzdHMKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICBpbnQgMAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaW50IGF4ZmVyCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnQgMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICByZXRzdWIKCgovLyBzbWFydF9jb250cmFjdHMuZXhjaGFuZ2VfcG9pbnRzLmNvbnRyYWN0Lk1hcmtldHBsYWNlU21hcnRDb250cmFjdC5idXkoYnV5ZXJUeG46IHVpbnQ2NCwgcXVhbnRpdHk6IHVpbnQ2NCkgLT4gdm9pZDoKYnV5OgogICAgcHJvdG8gMiAwCiAgICBpbnQgMAogICAgYnl0ZSAidW5pdGFyeVByaWNlIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBzZWxmLnVuaXRhcnlQcmljZSBleGlzdHMKICAgIGFzc2VydAogICAgdHhuIFNlbmRlcgogICAgZnJhbWVfZGlnIC0yCiAgICBndHhucyBTZW5kZXIKICAgID09CiAgICBhc3NlcnQKICAgIGZyYW1lX2RpZyAtMgogICAgZ3R4bnMgUmVjZWl2ZXIKICAgIGdsb2JhbCBDdXJyZW50QXBwbGljYXRpb25BZGRyZXNzCiAgICA9PQogICAgYXNzZXJ0CiAgICBmcmFtZV9kaWcgLTIKICAgIGd0eG5zIEFtb3VudAogICAgaW50IDAKICAgIGJ5dGUgInVuaXRhcnlQcmljZSIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgc2VsZi51bml0YXJ5UHJpY2UgZXhpc3RzCiAgICBmcmFtZV9kaWcgLTEKICAgICoKICAgID09CiAgICBhc3NlcnQKICAgIGl0eG5fYmVnaW4KICAgIGludCAwCiAgICBieXRlICJhc3NldElkIgogICAgYXBwX2dsb2JhbF9nZXRfZXgKICAgIGFzc2VydCAvLyBjaGVjayBzZWxmLmFzc2V0SWQgZXhpc3RzCiAgICB0eG4gU2VuZGVyCiAgICBmcmFtZV9kaWcgLTEKICAgIGl0eG5fZmllbGQgQXNzZXRBbW91bnQKICAgIGl0eG5fZmllbGQgQXNzZXRSZWNlaXZlcgogICAgaXR4bl9maWVsZCBYZmVyQXNzZXQKICAgIGludCBheGZlcgogICAgaXR4bl9maWVsZCBUeXBlRW51bQogICAgaW50IDAKICAgIGl0eG5fZmllbGQgRmVlCiAgICBpdHhuX3N1Ym1pdAogICAgcmV0c3ViCgoKLy8gc21hcnRfY29udHJhY3RzLmV4Y2hhbmdlX3BvaW50cy5jb250cmFjdC5NYXJrZXRwbGFjZVNtYXJ0Q29udHJhY3QuZGVsZXRlQXBwbGljYXRpb24oKSAtPiB2b2lkOgpkZWxldGVBcHBsaWNhdGlvbjoKICAgIHByb3RvIDAgMAogICAgdHhuIFNlbmRlcgogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICA9PQogICAgYXNzZXJ0CiAgICBpdHhuX2JlZ2luCiAgICBpbnQgMAogICAgYnl0ZSAiYXNzZXRJZCIKICAgIGFwcF9nbG9iYWxfZ2V0X2V4CiAgICBhc3NlcnQgLy8gY2hlY2sgc2VsZi5hc3NldElkIGV4aXN0cwogICAgZ2xvYmFsIENyZWF0b3JBZGRyZXNzCiAgICBkdXAKICAgIGl0eG5fZmllbGQgQXNzZXRDbG9zZVRvCiAgICBpbnQgMAogICAgaXR4bl9maWVsZCBBc3NldEFtb3VudAogICAgaXR4bl9maWVsZCBBc3NldFJlY2VpdmVyCiAgICBpdHhuX2ZpZWxkIFhmZXJBc3NldAogICAgaW50IGF4ZmVyCiAgICBpdHhuX2ZpZWxkIFR5cGVFbnVtCiAgICBpbnQgMAogICAgaXR4bl9maWVsZCBGZWUKICAgIGl0eG5fc3VibWl0CiAgICBpdHhuX2JlZ2luCiAgICBnbG9iYWwgQ3JlYXRvckFkZHJlc3MKICAgIGR1cAogICAgaXR4bl9maWVsZCBDbG9zZVJlbWFpbmRlclRvCiAgICBpbnQgMAogICAgaXR4bl9maWVsZCBBbW91bnQKICAgIGl0eG5fZmllbGQgUmVjZWl2ZXIKICAgIGludCBwYXkKICAgIGl0eG5fZmllbGQgVHlwZUVudW0KICAgIGludCAwCiAgICBpdHhuX2ZpZWxkIEZlZQogICAgaXR4bl9zdWJtaXQKICAgIHJldHN1Ygo=",
    "clear": "I3ByYWdtYSB2ZXJzaW9uIDEwCgpzbWFydF9jb250cmFjdHMuZXhjaGFuZ2VfcG9pbnRzLmNvbnRyYWN0Lk1hcmtldHBsYWNlU21hcnRDb250cmFjdC5jbGVhcl9zdGF0ZV9wcm9ncmFtOgogICAgaW50IDEKICAgIHJldHVybgo="
  },
  "state": {
    "global": {
      "num_byte_slices": 0,
      "num_uints": 2
    },
    "local": {
      "num_byte_slices": 0,
      "num_uints": 0
    }
  },
  "schema": {
    "global": {
      "declared": {
        "assetId": {
          "type": "uint64",
          "key": "assetId"
        },
        "unitaryPrice": {
          "type": "uint64",
          "key": "unitaryPrice"
        }
      },
      "reserved": {}
    },
    "local": {
      "declared": {},
      "reserved": {}
    }
  },
  "contract": {
    "name": "MarketplaceSmartContract",
    "methods": [
      {
        "name": "createApplication",
        "args": [
          {
            "type": "asset",
            "name": "assetId"
          },
          {
            "type": "uint64",
            "name": "unitaryPrice"
          }
        ],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "setPrice",
        "args": [
          {
            "type": "uint64",
            "name": "unitaryPrice"
          }
        ],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "optInToAsset",
        "args": [
          {
            "type": "pay",
            "name": "mbrPay"
          }
        ],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "buy",
        "args": [
          {
            "type": "pay",
            "name": "buyerTxn"
          },
          {
            "type": "uint64",
            "name": "quantity"
          }
        ],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "deleteApplication",
        "args": [],
        "readonly": false,
        "returns": {
          "type": "void"
        }
      }
    ],
    "networks": {}
  },
  "bare_call_config": {}
}

/**
 * Defines an onCompletionAction of 'no_op'
 */
export type OnCompleteNoOp =  { onCompleteAction?: 'no_op' | OnApplicationComplete.NoOpOC }
/**
 * Defines an onCompletionAction of 'opt_in'
 */
export type OnCompleteOptIn =  { onCompleteAction: 'opt_in' | OnApplicationComplete.OptInOC }
/**
 * Defines an onCompletionAction of 'close_out'
 */
export type OnCompleteCloseOut =  { onCompleteAction: 'close_out' | OnApplicationComplete.CloseOutOC }
/**
 * Defines an onCompletionAction of 'delete_application'
 */
export type OnCompleteDelApp =  { onCompleteAction: 'delete_application' | OnApplicationComplete.DeleteApplicationOC }
/**
 * Defines an onCompletionAction of 'update_application'
 */
export type OnCompleteUpdApp =  { onCompleteAction: 'update_application' | OnApplicationComplete.UpdateApplicationOC }
/**
 * A state record containing a single unsigned integer
 */
export type IntegerState = {
  /**
   * Gets the state value as a BigInt.
   */
  asBigInt(): bigint
  /**
   * Gets the state value as a number.
   */
  asNumber(): number
}
/**
 * A state record containing binary data
 */
export type BinaryState = {
  /**
   * Gets the state value as a Uint8Array
   */
  asByteArray(): Uint8Array
  /**
   * Gets the state value as a string
   */
  asString(): string
}

export type AppCreateCallTransactionResult = AppCallTransactionResult & Partial<AppCompilationResult> & AppReference
export type AppUpdateCallTransactionResult = AppCallTransactionResult & Partial<AppCompilationResult>

export type AppClientComposeCallCoreParams = Omit<AppClientCallCoreParams, 'sendParams'> & {
  sendParams?: Omit<SendTransactionParams, 'skipSending' | 'atc' | 'skipWaiting' | 'maxRoundsToWaitForConfirmation' | 'populateAppCallResources'>
}
export type AppClientComposeExecuteParams = Pick<SendTransactionParams, 'skipWaiting' | 'maxRoundsToWaitForConfirmation' | 'populateAppCallResources' | 'suppressLog'>

export type IncludeSchema = {
  /**
   * Any overrides for the storage schema to request for the created app; by default the schema indicated by the app spec is used.
   */
  schema?: Partial<AppStorageSchema>
}

/**
 * Defines the types of available calls and state of the MarketplaceSmartContract smart contract.
 */
export type MarketplaceSmartContract = {
  /**
   * Maps method signatures / names to their argument and return types.
   */
  methods:
    & Record<'createApplication(asset,uint64)void' | 'createApplication', {
      argsObj: {
        assetId: number | bigint
        unitaryPrice: bigint | number
      }
      argsTuple: [assetId: number | bigint, unitaryPrice: bigint | number]
      returns: void
    }>
    & Record<'setPrice(uint64)void' | 'setPrice', {
      argsObj: {
        unitaryPrice: bigint | number
      }
      argsTuple: [unitaryPrice: bigint | number]
      returns: void
    }>
    & Record<'optInToAsset(pay)void' | 'optInToAsset', {
      argsObj: {
        mbrPay: TransactionToSign | Transaction | Promise<SendTransactionResult>
      }
      argsTuple: [mbrPay: TransactionToSign | Transaction | Promise<SendTransactionResult>]
      returns: void
    }>
    & Record<'buy(pay,uint64)void' | 'buy', {
      argsObj: {
        buyerTxn: TransactionToSign | Transaction | Promise<SendTransactionResult>
        quantity: bigint | number
      }
      argsTuple: [buyerTxn: TransactionToSign | Transaction | Promise<SendTransactionResult>, quantity: bigint | number]
      returns: void
    }>
    & Record<'deleteApplication()void' | 'deleteApplication', {
      argsObj: {
      }
      argsTuple: []
      returns: void
    }>
  /**
   * Defines the shape of the global and local state of the application.
   */
  state: {
    global: {
      assetId?: IntegerState
      unitaryPrice?: IntegerState
    }
  }
}
/**
 * Defines the possible abi call signatures
 */
export type MarketplaceSmartContractSig = keyof MarketplaceSmartContract['methods']
/**
 * Defines an object containing all relevant parameters for a single call to the contract. Where TSignature is undefined, a bare call is made
 */
export type TypedCallParams<TSignature extends MarketplaceSmartContractSig | undefined> = {
  method: TSignature
  methodArgs: TSignature extends undefined ? undefined : Array<ABIAppCallArg | undefined>
} & AppClientCallCoreParams & CoreAppCallArgs
/**
 * Defines the arguments required for a bare call
 */
export type BareCallArgs = Omit<RawAppCallArgs, keyof CoreAppCallArgs>
/**
 * Maps a method signature from the MarketplaceSmartContract smart contract to the method's arguments in either tuple of struct form
 */
export type MethodArgs<TSignature extends MarketplaceSmartContractSig> = MarketplaceSmartContract['methods'][TSignature]['argsObj' | 'argsTuple']
/**
 * Maps a method signature from the MarketplaceSmartContract smart contract to the method's return type
 */
export type MethodReturn<TSignature extends MarketplaceSmartContractSig> = MarketplaceSmartContract['methods'][TSignature]['returns']

/**
 * A factory for available 'create' calls
 */
export type MarketplaceSmartContractCreateCalls = (typeof MarketplaceSmartContractCallFactory)['create']
/**
 * Defines supported create methods for this smart contract
 */
export type MarketplaceSmartContractCreateCallParams =
  | (TypedCallParams<'createApplication(asset,uint64)void'> & (OnCompleteNoOp))
/**
 * A factory for available 'delete' calls
 */
export type MarketplaceSmartContractDeleteCalls = (typeof MarketplaceSmartContractCallFactory)['delete']
/**
 * Defines supported delete methods for this smart contract
 */
export type MarketplaceSmartContractDeleteCallParams =
  | TypedCallParams<'deleteApplication()void'>
/**
 * Defines arguments required for the deploy method.
 */
export type MarketplaceSmartContractDeployArgs = {
  deployTimeParams?: TealTemplateParams
  /**
   * A delegate which takes a create call factory and returns the create call params for this smart contract
   */
  createCall?: (callFactory: MarketplaceSmartContractCreateCalls) => MarketplaceSmartContractCreateCallParams
  /**
   * A delegate which takes a delete call factory and returns the delete call params for this smart contract
   */
  deleteCall?: (callFactory: MarketplaceSmartContractDeleteCalls) => MarketplaceSmartContractDeleteCallParams
}


/**
 * Exposes methods for constructing all available smart contract calls
 */
export abstract class MarketplaceSmartContractCallFactory {
  /**
   * Gets available create call factories
   */
  static get create() {
    return {
      /**
       * Constructs a create call for the MarketplaceSmartContract smart contract using the createApplication(asset,uint64)void ABI method
       *
       * @param args Any args for the contract call
       * @param params Any additional parameters for the call
       * @returns A TypedCallParams object for the call
       */
      createApplication(args: MethodArgs<'createApplication(asset,uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs & AppClientCompilationParams & (OnCompleteNoOp) = {}) {
        return {
          method: 'createApplication(asset,uint64)void' as const,
          methodArgs: Array.isArray(args) ? args : [args.assetId, args.unitaryPrice],
          ...params,
        }
      },
    }
  }

  /**
   * Gets available delete call factories
   */
  static get delete() {
    return {
      /**
       * Constructs a delete call for the MarketplaceSmartContract smart contract using the deleteApplication()void ABI method
       *
       * @param args Any args for the contract call
       * @param params Any additional parameters for the call
       * @returns A TypedCallParams object for the call
       */
      deleteApplication(args: MethodArgs<'deleteApplication()void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
        return {
          method: 'deleteApplication()void' as const,
          methodArgs: Array.isArray(args) ? args : [],
          ...params,
        }
      },
    }
  }

  /**
   * Constructs a no op call for the setPrice(uint64)void ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static setPrice(args: MethodArgs<'setPrice(uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'setPrice(uint64)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.unitaryPrice],
      ...params,
    }
  }
  /**
   * Constructs a no op call for the optInToAsset(pay)void ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static optInToAsset(args: MethodArgs<'optInToAsset(pay)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'optInToAsset(pay)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.mbrPay],
      ...params,
    }
  }
  /**
   * Constructs a no op call for the buy(pay,uint64)void ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static buy(args: MethodArgs<'buy(pay,uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'buy(pay,uint64)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.buyerTxn, args.quantity],
      ...params,
    }
  }
}

/**
 * A client to make calls to the MarketplaceSmartContract smart contract
 */
export class MarketplaceSmartContractClient {
  /**
   * The underlying `ApplicationClient` for when you want to have more flexibility
   */
  public readonly appClient: ApplicationClient

  private readonly sender: SendTransactionFrom | undefined

  /**
   * Creates a new instance of `MarketplaceSmartContractClient`
   *
   * @param appDetails appDetails The details to identify the app to deploy
   * @param algod An algod client instance
   */
  constructor(appDetails: AppDetails, private algod: Algodv2) {
    this.sender = appDetails.sender
    this.appClient = algokit.getAppClient({
      ...appDetails,
      app: APP_SPEC
    }, algod)
  }

  /**
   * Checks for decode errors on the AppCallTransactionResult and maps the return value to the specified generic type
   *
   * @param result The AppCallTransactionResult to be mapped
   * @param returnValueFormatter An optional delegate to format the return value if required
   * @returns The smart contract response with an updated return value
   */
  protected mapReturnValue<TReturn, TResult extends AppCallTransactionResult = AppCallTransactionResult>(result: AppCallTransactionResult, returnValueFormatter?: (value: any) => TReturn): AppCallTransactionResultOfType<TReturn> & TResult {
    if(result.return?.decodeError) {
      throw result.return.decodeError
    }
    const returnValue = result.return?.returnValue !== undefined && returnValueFormatter !== undefined
      ? returnValueFormatter(result.return.returnValue)
      : result.return?.returnValue as TReturn | undefined
      return { ...result, return: returnValue } as AppCallTransactionResultOfType<TReturn> & TResult
  }

  /**
   * Calls the ABI method with the matching signature using an onCompletion code of NO_OP
   *
   * @param typedCallParams An object containing the method signature, args, and any other relevant parameters
   * @param returnValueFormatter An optional delegate which when provided will be used to map non-undefined return values to the target type
   * @returns The result of the smart contract call
   */
  public async call<TSignature extends keyof MarketplaceSmartContract['methods']>(typedCallParams: TypedCallParams<TSignature>, returnValueFormatter?: (value: any) => MethodReturn<TSignature>) {
    return this.mapReturnValue<MethodReturn<TSignature>>(await this.appClient.call(typedCallParams), returnValueFormatter)
  }

  /**
   * Idempotently deploys the MarketplaceSmartContract smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  public deploy(params: MarketplaceSmartContractDeployArgs & AppClientDeployCoreParams & IncludeSchema = {}): ReturnType<ApplicationClient['deploy']> {
    const createArgs = params.createCall?.(MarketplaceSmartContractCallFactory.create)
    const deleteArgs = params.deleteCall?.(MarketplaceSmartContractCallFactory.delete)
    return this.appClient.deploy({
      ...params,
      deleteArgs,
      createArgs,
      createOnCompleteAction: createArgs?.onCompleteAction,
    })
  }

  /**
   * Gets available create methods
   */
  public get create() {
    const $this = this
    return {
      /**
       * Creates a new instance of the MarketplaceSmartContract smart contract using the createApplication(asset,uint64)void ABI method.
       *
       * @param args The arguments for the smart contract call
       * @param params Any additional parameters for the call
       * @returns The create result
       */
      async createApplication(args: MethodArgs<'createApplication(asset,uint64)void'>, params: AppClientCallCoreParams & AppClientCompilationParams & IncludeSchema & CoreAppCallArgs & (OnCompleteNoOp) = {}) {
        return $this.mapReturnValue<MethodReturn<'createApplication(asset,uint64)void'>, AppCreateCallTransactionResult>(await $this.appClient.create(MarketplaceSmartContractCallFactory.create.createApplication(args, params)))
      },
    }
  }

  /**
   * Gets available delete methods
   */
  public get delete() {
    const $this = this
    return {
      /**
       * Deletes an existing instance of the MarketplaceSmartContract smart contract using the deleteApplication()void ABI method.
       *
       * @param args The arguments for the smart contract call
       * @param params Any additional parameters for the call
       * @returns The delete result
       */
      async deleteApplication(args: MethodArgs<'deleteApplication()void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
        return $this.mapReturnValue<MethodReturn<'deleteApplication()void'>>(await $this.appClient.delete(MarketplaceSmartContractCallFactory.delete.deleteApplication(args, params)))
      },
    }
  }

  /**
   * Makes a clear_state call to an existing instance of the MarketplaceSmartContract smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The clear_state result
   */
  public clearState(args: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.appClient.clearState(args)
  }

  /**
   * Calls the setPrice(uint64)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public setPrice(args: MethodArgs<'setPrice(uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(MarketplaceSmartContractCallFactory.setPrice(args, params))
  }

  /**
   * Calls the optInToAsset(pay)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public optInToAsset(args: MethodArgs<'optInToAsset(pay)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(MarketplaceSmartContractCallFactory.optInToAsset(args, params))
  }

  /**
   * Calls the buy(pay,uint64)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public buy(args: MethodArgs<'buy(pay,uint64)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(MarketplaceSmartContractCallFactory.buy(args, params))
  }

  /**
   * Extracts a binary state value out of an AppState dictionary
   *
   * @param state The state dictionary containing the state value
   * @param key The key of the state value
   * @returns A BinaryState instance containing the state value, or undefined if the key was not found
   */
  private static getBinaryState(state: AppState, key: string): BinaryState | undefined {
    const value = state[key]
    if (!value) return undefined
    if (!('valueRaw' in value))
      throw new Error(`Failed to parse state value for ${key}; received an int when expected a byte array`)
    return {
      asString(): string {
        return value.value
      },
      asByteArray(): Uint8Array {
        return value.valueRaw
      }
    }
  }

  /**
   * Extracts a integer state value out of an AppState dictionary
   *
   * @param state The state dictionary containing the state value
   * @param key The key of the state value
   * @returns An IntegerState instance containing the state value, or undefined if the key was not found
   */
  private static getIntegerState(state: AppState, key: string): IntegerState | undefined {
    const value = state[key]
    if (!value) return undefined
    if ('valueRaw' in value)
      throw new Error(`Failed to parse state value for ${key}; received a byte array when expected a number`)
    return {
      asBigInt() {
        return typeof value.value === 'bigint' ? value.value : BigInt(value.value)
      },
      asNumber(): number {
        return typeof value.value === 'bigint' ? Number(value.value) : value.value
      },
    }
  }

  /**
   * Returns the smart contract's global state wrapped in a strongly typed accessor with options to format the stored value
   */
  public async getGlobalState(): Promise<MarketplaceSmartContract['state']['global']> {
    const state = await this.appClient.getGlobalState()
    return {
      get assetId() {
        return MarketplaceSmartContractClient.getIntegerState(state, 'assetId')
      },
      get unitaryPrice() {
        return MarketplaceSmartContractClient.getIntegerState(state, 'unitaryPrice')
      },
    }
  }

  public compose(): MarketplaceSmartContractComposer {
    const client = this
    const atc = new AtomicTransactionComposer()
    let promiseChain:Promise<unknown> = Promise.resolve()
    const resultMappers: Array<undefined | ((x: any) => any)> = []
    return {
      setPrice(args: MethodArgs<'setPrice(uint64)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.setPrice(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      optInToAsset(args: MethodArgs<'optInToAsset(pay)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.optInToAsset(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      buy(args: MethodArgs<'buy(pay,uint64)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.buy(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      get delete() {
        const $this = this
        return {
          deleteApplication(args: MethodArgs<'deleteApplication()void'>, params?: AppClientComposeCallCoreParams) {
            promiseChain = promiseChain.then(() => client.delete.deleteApplication(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
            resultMappers.push(undefined)
            return $this
          },
        }
      },
      clearState(args?: BareCallArgs & AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.clearState({...args, sendParams: {...args?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom) {
        promiseChain = promiseChain.then(async () => atc.addTransaction(await algokit.getTransactionWithSigner(txn, defaultSender ?? client.sender)))
        return this
      },
      async atc() {
        await promiseChain
        return atc
      },
      async simulate(options?: SimulateOptions) {
        await promiseChain
        const result = await atc.simulate(client.algod, new modelsv2.SimulateRequest({ txnGroups: [], ...options }))
        return {
          ...result,
          returns: result.methodResults?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i]!(val.returnValue) : val.returnValue)
        }
      },
      async execute(sendParams?: AppClientComposeExecuteParams) {
        await promiseChain
        const result = await algokit.sendAtomicTransactionComposer({ atc, sendParams }, client.algod)
        return {
          ...result,
          returns: result.returns?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i]!(val.returnValue) : val.returnValue)
        }
      }
    } as unknown as MarketplaceSmartContractComposer
  }
}
export type MarketplaceSmartContractComposer<TReturns extends [...any[]] = []> = {
  /**
   * Calls the setPrice(uint64)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  setPrice(args: MethodArgs<'setPrice(uint64)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): MarketplaceSmartContractComposer<[...TReturns, MethodReturn<'setPrice(uint64)void'>]>

  /**
   * Calls the optInToAsset(pay)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  optInToAsset(args: MethodArgs<'optInToAsset(pay)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): MarketplaceSmartContractComposer<[...TReturns, MethodReturn<'optInToAsset(pay)void'>]>

  /**
   * Calls the buy(pay,uint64)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  buy(args: MethodArgs<'buy(pay,uint64)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): MarketplaceSmartContractComposer<[...TReturns, MethodReturn<'buy(pay,uint64)void'>]>

  /**
   * Gets available delete methods
   */
  readonly delete: {
    /**
     * Deletes an existing instance of the MarketplaceSmartContract smart contract using the deleteApplication()void ABI method.
     *
     * @param args The arguments for the smart contract call
     * @param params Any additional parameters for the call
     * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
     */
    deleteApplication(args: MethodArgs<'deleteApplication()void'>, params?: AppClientComposeCallCoreParams): MarketplaceSmartContractComposer<[...TReturns, MethodReturn<'deleteApplication()void'>]>
  }

  /**
   * Makes a clear_state call to an existing instance of the MarketplaceSmartContract smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  clearState(args?: BareCallArgs & AppClientComposeCallCoreParams & CoreAppCallArgs): MarketplaceSmartContractComposer<[...TReturns, undefined]>

  /**
   * Adds a transaction to the composer
   *
   * @param txn One of: A TransactionWithSigner object (returned as is), a TransactionToSign object (signer is obtained from the signer property), a Transaction object (signer is extracted from the defaultSender parameter), an async SendTransactionResult returned by one of algokit utils helpers (signer is obtained from the defaultSender parameter)
   * @param defaultSender The default sender to be used to obtain a signer where the object provided to the transaction parameter does not include a signer.
   */
  addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom): MarketplaceSmartContractComposer<TReturns>
  /**
   * Returns the underlying AtomicTransactionComposer instance
   */
  atc(): Promise<AtomicTransactionComposer>
  /**
   * Simulates the transaction group and returns the result
   */
  simulate(options?: SimulateOptions): Promise<MarketplaceSmartContractComposerSimulateResult<TReturns>>
  /**
   * Executes the transaction group and returns the results
   */
  execute(sendParams?: AppClientComposeExecuteParams): Promise<MarketplaceSmartContractComposerResults<TReturns>>
}
export type SimulateOptions = Omit<ConstructorParameters<typeof modelsv2.SimulateRequest>[0], 'txnGroups'>
export type MarketplaceSmartContractComposerSimulateResult<TReturns extends [...any[]]> = {
  returns: TReturns
  methodResults: ABIResult[]
  simulateResponse: modelsv2.SimulateResponse
}
export type MarketplaceSmartContractComposerResults<TReturns extends [...any[]]> = {
  returns: TReturns
  groupId: string
  txIds: string[]
  transactions: Transaction[]
}
