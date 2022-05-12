export type PuppetMaster = {
  "version": "0.1.0",
  "name": "puppet_master",
  "instructions": [
    {
      "name": "pullStrings",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "puppetProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "method",
          "type": "string"
        },
        {
          "name": "url",
          "type": "string"
        }
      ]
    }
  ]
};

export const IDL: PuppetMaster = {
  "version": "0.1.0",
  "name": "puppet_master",
  "instructions": [
    {
      "name": "pullStrings",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "puppetProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "method",
          "type": "string"
        },
        {
          "name": "url",
          "type": "string"
        }
      ]
    }
  ]
};
