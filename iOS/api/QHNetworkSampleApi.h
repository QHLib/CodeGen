// This file is generated by QHNetWorkApiGenerator
// And will not be overwritten if it has alreday exists
// Add your code here

#import <QHCoreLib/QHCoreLib.h>

@interface QHNetworkSampleApi : QHNetworkJsonApi

- (instancetype)init;

@end

@interface QHNetworkSampleApiResult : QHNetworkJsonApiResult

+ (void)p_parse:(QHNetworkSampleApiResult *)result
       response:(QHNetworkResponse *)response
          error:(NSError *__autoreleasing *)error
            api:(QHNetworkSampleApi *)api _QHNetworkSampleApi:(int)notUsed;

@end

#import "QHNetworkSampleApi+gen.h"
