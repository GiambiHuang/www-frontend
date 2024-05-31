export type Www = {
  "version": "0.1.0",
  "name": "www",
  "instructions": [
    {
      "name": "initMatchAccount",
      "accounts": [
        {
          "name": "matchAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "admin",
          "type": "publicKey"
        },
        {
          "name": "fee",
          "type": "u64"
        },
        {
          "name": "stakingCooldown",
          "type": "i16"
        },
        {
          "name": "startGameCooldown",
          "type": "i64"
        },
        {
          "name": "entranceFee",
          "type": "u64"
        },
        {
          "name": "roundDuration",
          "type": "i64"
        },
        {
          "name": "maxStartDelay",
          "type": "i64"
        },
        {
          "name": "roundSettlementDuration",
          "type": "i64"
        },
        {
          "name": "terminateTime",
          "type": "i64"
        }
      ]
    },
    {
      "name": "updateMatch",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "matchAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fee",
          "type": "u64"
        },
        {
          "name": "stakingCooldown",
          "type": "i16"
        },
        {
          "name": "startGameCooldown",
          "type": "i64"
        },
        {
          "name": "entranceFee",
          "type": "u64"
        },
        {
          "name": "roundDuration",
          "type": "i64"
        },
        {
          "name": "maxStartDelay",
          "type": "i64"
        },
        {
          "name": "roundSettlementDuration",
          "type": "i64"
        },
        {
          "name": "terminateTime",
          "type": "i64"
        }
      ]
    },
    {
      "name": "startGame",
      "accounts": [
        {
          "name": "matchAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gameAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "startTimeDelay",
          "type": "i64"
        }
      ]
    },
    {
      "name": "finish",
      "accounts": [
        {
          "name": "matchAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gameAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winnerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerStatsAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "join",
      "accounts": [
        {
          "name": "matchAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "attackAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerStatsAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "attack",
      "accounts": [
        {
          "name": "matchAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "attackAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "targetAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "target",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "terminate",
      "accounts": [
        {
          "name": "matchAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gameAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createPlayerStats",
      "accounts": [
        {
          "name": "playerStatsAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "match",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "number",
            "type": "u32"
          },
          {
            "name": "initTmp",
            "type": "i64"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "earned",
            "type": "u64"
          },
          {
            "name": "gameCfg",
            "type": {
              "defined": "GameCfg"
            }
          }
        ]
      }
    },
    {
      "name": "game",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "state",
            "type": {
              "defined": "GameState"
            }
          },
          {
            "name": "round",
            "type": {
              "defined": "Round"
            }
          },
          {
            "name": "survivors",
            "type": "u32"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "winner",
            "type": "publicKey"
          },
          {
            "name": "latestShotTmp",
            "type": "i64"
          },
          {
            "name": "rentExempt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "target",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pubKey",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "player",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lives",
            "type": "u8"
          },
          {
            "name": "registered",
            "type": "bool"
          },
          {
            "name": "attacked",
            "type": {
              "defined": "Attacked"
            }
          },
          {
            "name": "lastMatch",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "attack",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "attacked",
            "type": "publicKey"
          },
          {
            "name": "tmp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "stats",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "streaks",
            "type": {
              "defined": "Streak"
            }
          },
          {
            "name": "wins",
            "type": "u32"
          },
          {
            "name": "points",
            "type": {
              "defined": "Points"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "GameCfg",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fee",
            "type": "u64"
          },
          {
            "name": "stakingCooldown",
            "type": "i16"
          },
          {
            "name": "startGameCooldown",
            "type": "i64"
          },
          {
            "name": "entranceFee",
            "type": "u64"
          },
          {
            "name": "roundDuration",
            "type": "i64"
          },
          {
            "name": "maxStartDelay",
            "type": "i64"
          },
          {
            "name": "roundSettlementDuration",
            "type": "i64"
          },
          {
            "name": "terminateTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "Round",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "firstShooter",
            "type": "publicKey"
          },
          {
            "name": "firstShotTmp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "Attacked",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tmp",
            "type": "i64"
          },
          {
            "name": "attacker",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "Points",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "points",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "Streak",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lastJoined",
            "type": "i64"
          },
          {
            "name": "count",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "PlayerError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "AttackInSameRound"
          },
          {
            "name": "AlreadyRegistered"
          },
          {
            "name": "RoundNotFinished"
          },
          {
            "name": "NotRegistered"
          },
          {
            "name": "Dead"
          },
          {
            "name": "SelfAttack"
          },
          {
            "name": "InvalidJoinFee"
          },
          {
            "name": "NotWinner"
          },
          {
            "name": "RoundSettlementPeriod"
          },
          {
            "name": "TargetDead"
          }
        ]
      }
    },
    {
      "name": "MatchError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "CreateTooSoon"
          },
          {
            "name": "AlreadyInitialized"
          },
          {
            "name": "InvalidConfig"
          }
        ]
      }
    },
    {
      "name": "AdminError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "AdminAlreadySet"
          },
          {
            "name": "NotAdmin"
          }
        ]
      }
    },
    {
      "name": "GameState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "INACTIVE"
          },
          {
            "name": "LIVE"
          },
          {
            "name": "Paused"
          },
          {
            "name": "Draw"
          },
          {
            "name": "Finished"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "EndEvent",
      "fields": [
        {
          "name": "winner",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "claimed",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "JoinEvent",
      "fields": [
        {
          "name": "player",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "lives",
          "type": "u8",
          "index": false
        },
        {
          "name": "gameMatch",
          "type": "u32",
          "index": false
        }
      ]
    },
    {
      "name": "AttackEvent",
      "fields": [
        {
          "name": "attacker",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "target",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "targetLivesRemaining",
          "type": "u8",
          "index": false
        },
        {
          "name": "playersRemaining",
          "type": "u32",
          "index": false
        },
        {
          "name": "round",
          "type": "i64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotLive"
    },
    {
      "code": 6001,
      "name": "Paused"
    },
    {
      "code": 6002,
      "name": "NotStarted"
    },
    {
      "code": 6003,
      "name": "AlreadyStarted"
    },
    {
      "code": 6004,
      "name": "NotPlayingPeriod"
    },
    {
      "code": 6005,
      "name": "NotStakingPeriod"
    },
    {
      "code": 6006,
      "name": "CannotStartGame"
    },
    {
      "code": 6007,
      "name": "NotFinished"
    },
    {
      "code": 6008,
      "name": "NotMatchAccount"
    },
    {
      "code": 6009,
      "name": "ExceededMaxDelay"
    },
    {
      "code": 6010,
      "name": "FeeClaimed"
    }
  ]
};

export const IDL: Www = {
  "version": "0.1.0",
  "name": "www",
  "instructions": [
    {
      "name": "initMatchAccount",
      "accounts": [
        {
          "name": "matchAccount",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "admin",
          "type": "publicKey"
        },
        {
          "name": "fee",
          "type": "u64"
        },
        {
          "name": "stakingCooldown",
          "type": "i16"
        },
        {
          "name": "startGameCooldown",
          "type": "i64"
        },
        {
          "name": "entranceFee",
          "type": "u64"
        },
        {
          "name": "roundDuration",
          "type": "i64"
        },
        {
          "name": "maxStartDelay",
          "type": "i64"
        },
        {
          "name": "roundSettlementDuration",
          "type": "i64"
        },
        {
          "name": "terminateTime",
          "type": "i64"
        }
      ]
    },
    {
      "name": "updateMatch",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "matchAccount",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "fee",
          "type": "u64"
        },
        {
          "name": "stakingCooldown",
          "type": "i16"
        },
        {
          "name": "startGameCooldown",
          "type": "i64"
        },
        {
          "name": "entranceFee",
          "type": "u64"
        },
        {
          "name": "roundDuration",
          "type": "i64"
        },
        {
          "name": "maxStartDelay",
          "type": "i64"
        },
        {
          "name": "roundSettlementDuration",
          "type": "i64"
        },
        {
          "name": "terminateTime",
          "type": "i64"
        }
      ]
    },
    {
      "name": "startGame",
      "accounts": [
        {
          "name": "matchAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gameAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "startTimeDelay",
          "type": "i64"
        }
      ]
    },
    {
      "name": "finish",
      "accounts": [
        {
          "name": "matchAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gameAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winnerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerStatsAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "join",
      "accounts": [
        {
          "name": "matchAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "attackAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerStatsAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "attack",
      "accounts": [
        {
          "name": "matchAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "game",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "attackAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "playerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "targetAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "target",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "terminate",
      "accounts": [
        {
          "name": "matchAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gameAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "admin",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createPlayerStats",
      "accounts": [
        {
          "name": "playerStatsAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "player",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "match",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "number",
            "type": "u32"
          },
          {
            "name": "initTmp",
            "type": "i64"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "earned",
            "type": "u64"
          },
          {
            "name": "gameCfg",
            "type": {
              "defined": "GameCfg"
            }
          }
        ]
      }
    },
    {
      "name": "game",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "state",
            "type": {
              "defined": "GameState"
            }
          },
          {
            "name": "round",
            "type": {
              "defined": "Round"
            }
          },
          {
            "name": "survivors",
            "type": "u32"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "winner",
            "type": "publicKey"
          },
          {
            "name": "latestShotTmp",
            "type": "i64"
          },
          {
            "name": "rentExempt",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "target",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pubKey",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "player",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lives",
            "type": "u8"
          },
          {
            "name": "registered",
            "type": "bool"
          },
          {
            "name": "attacked",
            "type": {
              "defined": "Attacked"
            }
          },
          {
            "name": "lastMatch",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "attack",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "attacked",
            "type": "publicKey"
          },
          {
            "name": "tmp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "stats",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "streaks",
            "type": {
              "defined": "Streak"
            }
          },
          {
            "name": "wins",
            "type": "u32"
          },
          {
            "name": "points",
            "type": {
              "defined": "Points"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "GameCfg",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fee",
            "type": "u64"
          },
          {
            "name": "stakingCooldown",
            "type": "i16"
          },
          {
            "name": "startGameCooldown",
            "type": "i64"
          },
          {
            "name": "entranceFee",
            "type": "u64"
          },
          {
            "name": "roundDuration",
            "type": "i64"
          },
          {
            "name": "maxStartDelay",
            "type": "i64"
          },
          {
            "name": "roundSettlementDuration",
            "type": "i64"
          },
          {
            "name": "terminateTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "Round",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "firstShooter",
            "type": "publicKey"
          },
          {
            "name": "firstShotTmp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "Attacked",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tmp",
            "type": "i64"
          },
          {
            "name": "attacker",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "Points",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "points",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "Streak",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lastJoined",
            "type": "i64"
          },
          {
            "name": "count",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "PlayerError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "AttackInSameRound"
          },
          {
            "name": "AlreadyRegistered"
          },
          {
            "name": "RoundNotFinished"
          },
          {
            "name": "NotRegistered"
          },
          {
            "name": "Dead"
          },
          {
            "name": "SelfAttack"
          },
          {
            "name": "InvalidJoinFee"
          },
          {
            "name": "NotWinner"
          },
          {
            "name": "RoundSettlementPeriod"
          },
          {
            "name": "TargetDead"
          }
        ]
      }
    },
    {
      "name": "MatchError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "CreateTooSoon"
          },
          {
            "name": "AlreadyInitialized"
          },
          {
            "name": "InvalidConfig"
          }
        ]
      }
    },
    {
      "name": "AdminError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "AdminAlreadySet"
          },
          {
            "name": "NotAdmin"
          }
        ]
      }
    },
    {
      "name": "GameState",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "INACTIVE"
          },
          {
            "name": "LIVE"
          },
          {
            "name": "Paused"
          },
          {
            "name": "Draw"
          },
          {
            "name": "Finished"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "EndEvent",
      "fields": [
        {
          "name": "winner",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "claimed",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "JoinEvent",
      "fields": [
        {
          "name": "player",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "lives",
          "type": "u8",
          "index": false
        },
        {
          "name": "gameMatch",
          "type": "u32",
          "index": false
        }
      ]
    },
    {
      "name": "AttackEvent",
      "fields": [
        {
          "name": "attacker",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "target",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "targetLivesRemaining",
          "type": "u8",
          "index": false
        },
        {
          "name": "playersRemaining",
          "type": "u32",
          "index": false
        },
        {
          "name": "round",
          "type": "i64",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotLive"
    },
    {
      "code": 6001,
      "name": "Paused"
    },
    {
      "code": 6002,
      "name": "NotStarted"
    },
    {
      "code": 6003,
      "name": "AlreadyStarted"
    },
    {
      "code": 6004,
      "name": "NotPlayingPeriod"
    },
    {
      "code": 6005,
      "name": "NotStakingPeriod"
    },
    {
      "code": 6006,
      "name": "CannotStartGame"
    },
    {
      "code": 6007,
      "name": "NotFinished"
    },
    {
      "code": 6008,
      "name": "NotMatchAccount"
    },
    {
      "code": 6009,
      "name": "ExceededMaxDelay"
    },
    {
      "code": 6010,
      "name": "FeeClaimed"
    }
  ]
};
