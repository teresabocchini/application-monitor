//
//  ChecklistTableViewCell.swift
//  Application Monitor
//
//  Created by Teresa Bocchini on 3/2/18.
//  Copyright © 2018 Teresa Bocchini. All rights reserved.
//

import UIKit

class ChecklistTableViewCell: UITableViewCell {
    // MARK: Properties
    @IBOutlet weak var nameLabel: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
}
