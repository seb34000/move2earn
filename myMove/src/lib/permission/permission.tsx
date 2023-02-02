/*
| Developed by Starton
| Filename : permission.tsx
| Author : Sebastien Phelip (sebastien@starton.io)
*/

import AppleHealthKit, {
    HealthKitPermissions,
} from 'react-native-health'
  
const permissions = {
    permissions: {
      read: [AppleHealthKit.Constants.Permissions.Steps, AppleHealthKit.Constants.Permissions.StepCount],
      write: [AppleHealthKit.Constants.Permissions.Steps, AppleHealthKit.Constants.Permissions.StepCount],
    },
} as HealthKitPermissions

export default permissions
  