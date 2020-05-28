export const simpleTree = {
  id: 1,
  text: 'root',
  layout: {
    top: 0,
    left: 0,
  },
  style: {
    textColor: {
      isOverrideByCommonSetting: true,
      value: '#fff',
    },
    backgroundColor: {
      isOverrideByCommonSetting: true,
      value: '#000',
    },
    edgeColor: {
      isOverrideByCommonSetting: true,
      value: '#000',
    },
  },
  children: [
    {
      id: 2,
      text: 'left child',
      layout: {
        top: 0,
        left: 0,
      },
      style: {
        textColor: {
          isOverrideByCommonSetting: true,
          value: '#fff',
        },
        backgroundColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
        edgeColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
      },
      children: [
        {
          id: 4,
          text: 'grand child',
          layout: {
            top: 0,
            left: 0,
          },
          style: {
            textColor: {
              isOverrideByCommonSetting: true,
              value: '#fff',
            },
            backgroundColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
            edgeColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
          },
          children: [],
        },
      ],
    },
    {
      id: 3,
      text: 'right child',
      layout: {
        top: 0,
        left: 0,
      },
      style: {
        textColor: {
          isOverrideByCommonSetting: true,
          value: '#fff',
        },
        backgroundColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
        edgeColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
      },
      children: [],
    },
  ],
};

export const complexTree = {
  id: 1,
  text: 'A',
  layout: {
    top: 0,
    left: 0,
  },
  style: {
    textColor: {
      isOverrideByCommonSetting: true,
      value: '#fff',
    },
    backgroundColor: {
      isOverrideByCommonSetting: true,
      value: '#000',
    },
    edgeColor: {
      isOverrideByCommonSetting: true,
      value: '#000',
    },
  },
  children: [
    {
      id: 2,
      text: 'B',
      layout: {
        top: 0,
        left: 0,
      },
      style: {
        textColor: {
          isOverrideByCommonSetting: true,
          value: '#fff',
        },
        backgroundColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
        edgeColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
      },
      children: [
        {
          id: 4,
          text: 'D',
          layout: {
            top: 0,
            left: 0,
          },
          style: {
            textColor: {
              isOverrideByCommonSetting: true,
              value: '#fff',
            },
            backgroundColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
            edgeColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
          },
          children: [],
        },
        {
          id: 5,
          text: 'E',
          layout: {
            top: 0,
            left: 0,
          },
          style: {
            textColor: {
              isOverrideByCommonSetting: true,
              value: '#fff',
            },
            backgroundColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
            edgeColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
          },
          children: [],
        },
      ],
    },
    {
      id: 3,
      text: 'C',
      layout: {
        top: 0,
        left: 0,
      },
      style: {
        textColor: {
          isOverrideByCommonSetting: true,
          value: '#fff',
        },
        backgroundColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
        edgeColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
      },
      children: [
        {
          id: 6,
          text: 'F',
          layout: {
            top: 0,
            left: 0,
          },
          style: {
            textColor: {
              isOverrideByCommonSetting: true,
              value: '#fff',
            },
            backgroundColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
            edgeColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
          },
          children: [],
        },
        {
          id: 7,
          text: 'G',
          layout: {
            top: 0,
            left: 0,
          },
          style: {
            textColor: {
              isOverrideByCommonSetting: true,
              value: '#fff',
            },
            backgroundColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
            edgeColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
          },
          children: [],
        },
        {
          id: 8,
          text: 'H',
          layout: {
            top: 0,
            left: 0,
          },
          style: {
            textColor: {
              isOverrideByCommonSetting: true,
              value: '#fff',
            },
            backgroundColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
            edgeColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
          },
          children: [],
        },
      ],
    },
  ],
};

// updateLayoutInformationOfTree(simpleTree, {width: 100, height: 50}, 740)
export const calculatedSimpleTree = {
  id: 1,
  text: 'root',
  layout: {
    top: 20,
    left: 320,
  },
  style: {
    textColor: {
      isOverrideByCommonSetting: true,
      value: '#fff',
    },
    backgroundColor: {
      isOverrideByCommonSetting: true,
      value: '#000',
    },
    edgeColor: {
      isOverrideByCommonSetting: true,
      value: '#000',
    },
  },
  children: [
    {
      id: 2,
      text: 'left child',
      layout: {
        top: 220,
        left: 135,
      },
      style: {
        textColor: {
          isOverrideByCommonSetting: true,
          value: '#fff',
        },
        backgroundColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
        edgeColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
      },
      children: [
        {
          id: 4,
          text: 'grand child',
          layout: {
            top: 420,
            left: 135,
          },
          style: {
            textColor: {
              isOverrideByCommonSetting: true,
              value: '#fff',
            },
            backgroundColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
            edgeColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
          },
          children: [],
        },
      ],
    },
    {
      id: 3,
      text: 'right child',
      layout: {
        top: 220,
        left: 505,
      },
      style: {
        textColor: {
          isOverrideByCommonSetting: true,
          value: '#fff',
        },
        backgroundColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
        edgeColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
      },
      children: [],
    },
  ],
};

// updateLayoutInformationOfTree(complexTree, {width: 100, height: 50}, 740)
export const calculatedComplexTree = {
  id: 1,
  text: 'A',
  layout: {
    top: 20,
    left: 320,
  },
  style: {
    textColor: {
      isOverrideByCommonSetting: true,
      value: '#fff',
    },
    backgroundColor: {
      isOverrideByCommonSetting: true,
      value: '#000',
    },
    edgeColor: {
      isOverrideByCommonSetting: true,
      value: '#000',
    },
  },
  children: [
    {
      id: 2,
      text: 'B',
      layout: {
        top: 220,
        left: 135,
      },
      style: {
        textColor: {
          isOverrideByCommonSetting: true,
          value: '#fff',
        },
        backgroundColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
        edgeColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
      },
      children: [
        {
          id: 4,
          text: 'D',
          layout: {
            top: 420,
            left: 42,
          },
          style: {
            textColor: {
              isOverrideByCommonSetting: true,
              value: '#fff',
            },
            backgroundColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
            edgeColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
          },
          children: [],
        },
        {
          id: 5,
          text: 'E',
          layout: {
            top: 420,
            left: 227,
          },
          style: {
            textColor: {
              isOverrideByCommonSetting: true,
              value: '#fff',
            },
            backgroundColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
            edgeColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
          },
          children: [],
        },
      ],
    },
    {
      id: 3,
      text: 'C',
      layout: {
        top: 220,
        left: 505,
      },
      style: {
        textColor: {
          isOverrideByCommonSetting: true,
          value: '#fff',
        },
        backgroundColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
        edgeColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
      },
      children: [
        {
          id: 6,
          text: 'F',
          layout: {
            top: 420,
            left: 381,
          },
          style: {
            textColor: {
              isOverrideByCommonSetting: true,
              value: '#fff',
            },
            backgroundColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
            edgeColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
          },
          children: [],
        },
        {
          id: 7,
          text: 'G',
          layout: {
            top: 420,
            left: 504,
          },
          style: {
            textColor: {
              isOverrideByCommonSetting: true,
              value: '#fff',
            },
            backgroundColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
            edgeColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
          },
          children: [],
        },
        {
          id: 8,
          text: 'H',
          layout: {
            top: 420,
            left: 627,
          },
          style: {
            textColor: {
              isOverrideByCommonSetting: true,
              value: '#fff',
            },
            backgroundColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
            edgeColor: {
              isOverrideByCommonSetting: true,
              value: '#000',
            },
          },
          children: [],
        },
      ],
    },
  ],
};

export const sampleTreeBeforeOptimization = {
  id: 1,
  text: 'Parent',
  layout: {
    top: 20,
    left: 81,
  },
  style: {
    textColor: {
      isOverrideByCommonSetting: true,
      value: '#fff',
    },
    backgroundColor: {
      isOverrideByCommonSetting: true,
      value: '#000',
    },
    edgeColor: {
      isOverrideByCommonSetting: true,
      value: '#000',
    },
  },
  children: [
    {
      id: 2,
      text: 'Child A',
      layout: {
        top: 140,
        left: 21,
      },
      style: {
        textColor: {
          isOverrideByCommonSetting: true,
          value: '#fff',
        },
        backgroundColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
        edgeColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
      },
      children: [],
    },
    {
      id: 3,
      text: 'Child B',
      layout: {
        top: 140,
        left: 141,
      },
      style: {
        textColor: {
          isOverrideByCommonSetting: true,
          value: '#fff',
        },
        backgroundColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
        edgeColor: {
          isOverrideByCommonSetting: true,
          value: '#000',
        },
      },
      children: [],
    },
  ],
};

export const sampleOptimizedTree = {
  id: 1,
  text: 'Parent',
  layout: {top: 20, left: 83},
  style: {
    textColor: {isOverrideByCommonSetting: true, value: '#fff'},
    backgroundColor: {isOverrideByCommonSetting: true, value: '#000'},
    edgeColor: {isOverrideByCommonSetting: true, value: '#000'},
  },
  children: [
    {
      id: 2,
      text: 'Child A',
      layout: {top: 140, left: 22},
      style: {
        textColor: {isOverrideByCommonSetting: true, value: '#fff'},
        backgroundColor: {isOverrideByCommonSetting: true, value: '#000'},
        edgeColor: {isOverrideByCommonSetting: true, value: '#000'},
      },
      children: [],
      width: 77,
      height: 30,
    },
    {
      id: 3,
      text: 'Child B',
      layout: {top: 140, left: 139},
      style: {
        textColor: {isOverrideByCommonSetting: true, value: '#fff'},
        backgroundColor: {isOverrideByCommonSetting: true, value: '#000'},
        edgeColor: {isOverrideByCommonSetting: true, value: '#000'},
      },
      children: [],
      width: 77,
      height: 30,
    },
  ],
  width: 72,
  height: 30,
};

// generateEdgesOfTree(sampleOptimizedTree)
export const edgesOfSampleOptimizedTree = [
  {
    id: 2,
    top: 50,
    left: 60,
    width: 59,
    color: {isOverrideByCommonSetting: true, value: '#000'},
    positionOfParent: 'right',
  },
  {
    id: 3,
    top: 50,
    left: 119,
    width: 58,
    color: {isOverrideByCommonSetting: true, value: '#000'},
    positionOfParent: 'left',
  },
];
