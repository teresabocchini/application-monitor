//
//  Schedule.swift
//  Application Monitor
//
//  Created by Teresa Bocchini on 2/23/18.
//  Copyright © 2018 Teresa Bocchini. All rights reserved.
//

import UIKit
import os.log

class Schedule: NSObject, NSCoding {
    
    // MARK: Properties
    var method: String
    
    init(method: String) {
        self.method = method
    }
    
    // MARK: Archiving Paths
    static let DocumentsDirectory = FileManager().urls(for: .documentDirectory, in: .userDomainMask).first!
    static let ArchiveURL = DocumentsDirectory.appendingPathComponent("schedule")
    
    // MARK: Types
    struct PropertyKey {
        static let method = "method"
    }
    
    // MARK: NSCoding
    func encode(with aCoder: NSCoder) {
        aCoder.encode(method, forKey: PropertyKey.method)
    }
    
    required convenience init?(coder aDecoder: NSCoder) {
        guard let method = aDecoder.decodeObject(forKey: PropertyKey.method) as? String else {
            os_log("Unable to decode method for the Schedule object.", log: OSLog.default, type: .debug)
            return nil
        }
        
        self.init(method: method)
    }
}
