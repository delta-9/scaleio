export const model = {
/**
 * Service definitions
 *
 **/
"services":
{ 
   // EC2 instance
   "ec2": {
    "id": "ec2",
    "relationships": [
      "vpc__ec2",
      "autoscaling_group__ec2"
      //"ec2__ec2" ?
    ],
    "config": {
      // List of fields / validation / and requirements for the green status
    }
  }, 
  // VPC
  "vpc": {
    "id": "vpc",
    "relationships": [
      "vpc__ec2",
      "vpc__autoscaling_group",
      "vpc__rds"
      //"vpc__vpc"
      //"vpc__s3"
    ],
    "config": {
      // List of fields / validation / and requirements for the green status
      // region?
    }
  }, 
  // Autoscaling group
  "autoscaling_group": {
    "id": "vpc",
    "relationships": [
      "vpc__autoscaling_group",
      "lb__autoscaling_group"
      //"vpc__vpc" ?
    ],
    "config": {
      // List of fields / validation / and requirements for the green status
    }
  },
  // Load balancer
  "lb": {
    "id": "lb",
    "relationships": [
      "lb__vpc", // ? via security group?
      "lb__autoscaling_group" // ?
      //"vpc__vpc" ?
    ],
    "config": {
      // List of fields / validation / and requirements for the green status
    }
  }
},

/**
 * Relationship type definitions
 *
 **/
"relationships":
{
  "vpc__ec2": {
    "connections": [
      "vpc_network"
    ],
    "insights": [
      "Your ec2 instance(s) must be inside a VPC, "
    ]
  },
  "autoscaling_group__ec2": {
    "connections": [
      "autoscaling_group_ec2"
    ],
    "insights": [
      "You can use an autoscaling group with a load balancer to manage the number of live instance"
    ]
  },
  "vpc__autoscaling_group": {
    "connections": [
      "vpc_network"
    ],
    "insights": [
      "An autoscaling group must be inside a VPC"
    ]
  },
  "lb__autoscaling_group": {
    "connections": [
      "load_balancer"
    ],
    "insights": [
      "You can use a load balancer to route the traffic to multiple instance"
    ]
  },
  "vpc__rds": {
    "connections": [
      "peering"
    ],
    "insights": [
      "RDS should be connected with a VPC to authorize transactions with this VPC"
    ]
  }
},

/**
 * Connection type definitions
 *
 **/
"connections":
{
  "peering": {
    "type": "wire",
    "config": {
      // List of fields / validation / and requirements for the status
    },
    "insights": [
      "What peering connection"
    ]
  },
  "load_balancer": {
    "type": "wire",
    "config": {
      // List of fields / validation / and requirements for the status
    },
    "insights": [
      "What load balancer connection"
    ]
  },
  "security_group": {
    "type": "wire",
    "config": {
      // List of fields / validation / and requirements for the status
    },
    "insights": [
      "What security_group connection"
    ]
  },
  "vpc_network": {
    "type": "provider",
    "config": {
      // List of fields / validation / and requirements for the status
    },
    "insights": [
      "What's a vpc network provide"
    ]
  },
  "autoscaling_group_ec2": {
    "type": "orchestrate",
    "config": {
      "instance_count": {
        "type": "number",
        "required": true
        // widget settings
      },
      "instance_count_minimum": {
        "type": "number",
        "required": true
        // widget settings
      }
    },
    "insights": [
      "What's an autoscaling group ec2 instances orchestration"
    ]
  }
},

/**
 * Element definitions (services layout representation)
 *
 **/
"element": 
{
  "ec2": {
    "dimensions": { "tileWidth":2, "tileHeight": 2 },
    // Placement constraints groups
    "constraints": [
    {
      "must": [{
        "inside": "vpc"
      }]
    },
    // OR
    {
      "must": [{
        "inside": "autoscaling_group"
      }],
      "model": "ec2_autoscaling_group_model"
    }]
  },
  // VPC
  "vpc": {
    "dimensions": { "tileWidth":40, "tileHeight": 40 },
    "constraints": []
  }, 
  // Autoscaling group
  "autoscaling_group": {
    "dimensions": { "tileWidth":8, "tileHeight": 4 },
    "constraints": [
    {
      "must": [{
        "inside": "vpc"
      }]
    },
    // OR
    {
      "must": [{
        "inside": "vpc"
      },
      {
        "contain": "ec2"
      }]
    }]
  },
  // Load balancer
  "lb": {
    "dimensions": { "tileWidth":8, "tileHeight": 4 },
    "constraints": [
    {
      "must_not": [{
        "collide": "vpc"
      }],
      "should":[{
        "stick": "vpc"
      }]
    }]
  }
},

/**
 * Model definitions
 *
 **/
"model":
{
  "ec2_autoscaling_group_model": {
    "elements": [
      {
        "type": "autoscaling_group",
        "position": "center"
      }
    ],
    "insights": [
      "Let the autoscaling group orchestrate your ec2 instances"
    ]
  }
}



};
