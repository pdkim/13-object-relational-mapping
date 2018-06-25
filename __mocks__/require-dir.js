'use strict';

export default (dir) => {
  const falseMongo = {
    find: () => Promise.resolve([]),
    findById: () => Promise.resolve([]),
    save: data => Promise.resolve(data),
    findByIdAndDelete: () => Promise.resolve([]),
    findByIdAndUpdate: () => Promise.resolve([]),
  };

  if(typeof dir !== 'string') {return {};}
  return {
    'foo': {default: falseMongo},
    'worker': {default: falseMongo},
    'baz': {default: falseMongo},
  };
};