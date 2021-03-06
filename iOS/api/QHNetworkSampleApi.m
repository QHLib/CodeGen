// This file is generated by QHNetWorkApiGenerator
// And will not be overwritten if it has alreday exists
// Add your code here

#import "QHNetworkSampleApi.h"

NS_ASSUME_NONNULL_BEGIN

@implementation QHNetworkSampleApi

+ (NSString *)modifyUrl:(NSString *)url
{
    if ([url hasPrefix:@"https://"]) {
        url = [url stringByReplacingCharactersInRange:NSMakeRange(0, 5) withString:@"http"];
    }
    return url;
}

@end

@implementation QHNetworkSampleApiResult

+ (void)p_parse:(QHNetworkSampleApiResult *)result
       response:(QHNetworkResponse *)response
          error:(NSError *__autoreleasing *)error
            api:(QHNetworkSampleApi *)api _QHNetworkSampleApi:(int)notUsed
{
}

@end

NS_ASSUME_NONNULL_END
